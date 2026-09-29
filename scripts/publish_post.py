#!/usr/bin/env python3
"""
Blog Publishing Engine for josemarichal.github.io
Converts plain text or Markdown files/text into beautifully styled static blog posts,
updates posts/posts.json, and synchronizes blog.html.

Usage:
    python publish_post.py path/to/file.txt
    python publish_post.py --clipboard --push      # Publishes whatever is in your clipboard!
    python publish_post.py --paste --push          # Lets you paste text directly in terminal
    python publish_post.py --server                # Opens browser studio with 1-click publishing
    python publish_post.py --all-drafts --push
"""

import os
import sys
import re
import json
import math
import shutil
import argparse
import subprocess
from datetime import datetime

# Root workspace directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
DRAFTS_DIR = os.path.join(ROOT_DIR, "blog_drafts")
PUBLISHED_DRAFTS_DIR = os.path.join(DRAFTS_DIR, "published")
POSTS_DIR = os.path.join(ROOT_DIR, "posts")
POSTS_JSON_PATH = os.path.join(POSTS_DIR, "posts.json")
BLOG_HTML_PATH = os.path.join(ROOT_DIR, "blog.html")
POST_TEMPLATE_PATH = os.path.join(POSTS_DIR, "template.html")

os.makedirs(DRAFTS_DIR, exist_ok=True)
os.makedirs(PUBLISHED_DRAFTS_DIR, exist_ok=True)
os.makedirs(POSTS_DIR, exist_ok=True)


def parse_frontmatter(content):
    """Extract YAML frontmatter if present."""
    metadata = {}
    body = content

    pattern = r"^---\s*\r?\n(.*?)\r?\n---\s*\r?\n(.*)$"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        raw_yaml = match.group(1)
        body = match.group(2)
        try:
            import yaml
            parsed = yaml.safe_load(raw_yaml)
            if isinstance(parsed, dict):
                metadata = parsed
        except Exception:
            for line in raw_yaml.splitlines():
                if ":" in line:
                    key, val = line.split(":", 1)
                    key = key.strip()
                    val = val.strip().strip("'\"")
                    if val.startswith("[") and val.endswith("]"):
                        val = [item.strip().strip("'\"") for item in val[1:-1].split(",") if item.strip()]
                    metadata[key] = val

    return metadata, body


def slugify(text):
    """Generate a clean URL slug from title."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text or "post"


def markdown_to_html(md_text):
    """Convert markdown to semantic HTML with fallback."""
    try:
        import markdown
        return markdown.markdown(
            md_text,
            extensions=["fenced_code", "tables", "nl2br", "sane_lists"]
        )
    except Exception:
        # Fallback simple converter
        html_lines = []
        in_code_block = False
        in_list = False

        for line in md_text.splitlines():
            line_str = line.strip()
            if line_str.startswith("```"):
                if in_code_block:
                    html_lines.append("</code></pre>")
                    in_code_block = False
                else:
                    html_lines.append("<pre><code>")
                    in_code_block = True
                continue

            if in_code_block:
                html_lines.append(line)
                continue

            if not line_str:
                if in_list:
                    html_lines.append("</ul>")
                    in_list = False
                continue

            if line_str.startswith("### "):
                html_lines.append(f"<h3>{line_str[4:]}</h3>")
            elif line_str.startswith("## "):
                html_lines.append(f"<h2>{line_str[3:]}</h2>")
            elif line_str.startswith("# "):
                html_lines.append(f"<h1>{line_str[2:]}</h1>")
            elif line_str.startswith("> "):
                html_lines.append(f"<blockquote><p>{line_str[2:]}</p></blockquote>")
            elif line_str.startswith("- ") or line_str.startswith("* "):
                if not in_list:
                    html_lines.append("<ul>")
                    in_list = True
                html_lines.append(f"<li>{line_str[2:]}</li>")
            else:
                if in_list:
                    html_lines.append("</ul>")
                    in_list = False
                p = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", line)
                p = re.sub(r"\*(.*?)\*", r"<em>\1</em>", p)
                p = re.sub(r"\[(.*?)\]\((.*?)\)", r'<a href="\2">\1</a>', p)
                html_lines.append(f"<p>{p}</p>")

        if in_code_block:
            html_lines.append("</code></pre>")
        if in_list:
            html_lines.append("</ul>")

        return "\n".join(html_lines)


def clean_text_for_excerpt(text, max_len=180):
    """Strip HTML, markdown and return a clean excerpt."""
    clean = re.sub(r"<[^>]+>", " ", text)
    clean = re.sub(r"#{1,6}\s+.*", "", clean)
    clean = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", clean)
    clean = re.sub(r"[\*\_`>#-]", "", clean)
    clean = re.sub(r"\s+", " ", clean).strip()
    if len(clean) > max_len:
        cutoff = clean[:max_len].rfind(" ")
        if cutoff != -1:
            clean = clean[:cutoff] + "..."
        else:
            clean = clean[:max_len] + "..."
    return clean


def calculate_reading_time(text):
    words = len(re.findall(r"\w+", text))
    mins = max(1, math.ceil(words / 200))
    return f"{mins} min read"


def load_posts_metadata():
    if os.path.exists(POSTS_JSON_PATH):
        try:
            with open(POSTS_JSON_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []


def save_posts_metadata(posts):
    posts.sort(key=lambda x: x.get("date", ""), reverse=True)
    with open(POSTS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)


def generate_post_html(title, date_str, display_date, read_time, tags, body_html, slug):
    """Build the final HTML for an individual post."""
    tags_html = "".join([f'<span class="blog-tag">{t}</span>' for t in tags])

    return f"""<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | José Marichal</title>
    <meta name="description" content="{clean_text_for_excerpt(body_html, 160)}">
    <link rel="stylesheet" href="../style.css?v=5">
</head>

<body>
    <header>
        <div class="container">
            <div class="logo">
                <a href="../index.html">José <span>Marichal</span></a>
            </div>
            <nav>
                <ul>
                    <li><a href="../cv.html">CV</a></li>
                    <li><a href="../teaching.html">Teaching</a></li>
                    <li><a href="../projects.html">Projects</a></li>
                    <li><a href="../blog.html" class="active">Blog</a></li>
                    <li><a href="../about.html">Civic AI Working Group</a></li>
                    <li><a href="../books.html">Books</a></li>
                    <li><a href="../media.html">Media</a></li>
                    <li><a href="../invited_talks.html">Invited Talks</a></li>
                    <li><a href="../ai_tools.html">AI Tools</a></li>
                    <li><a href="../just_for_fun.html">Just for Fun</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <div class="container">
            <article class="single-post-wrapper">
                <a href="../blog.html" class="back-to-blog">← Back to Blog</a>

                <header class="post-header">
                    <div class="post-meta-bar">
                        <span class="meta-date">{display_date}</span>
                        <span class="meta-dot">•</span>
                        <span>{read_time}</span>
                        <span class="meta-dot">•</span>
                        <div class="blog-tags" style="display:inline-flex;">
                            {tags_html}
                        </div>
                    </div>
                    <h1>{title}</h1>
                </header>

                <div class="post-body">
{body_html}
                </div>

                <div class="post-author-box">
                    <img src="../images/profile_sharpened.png" alt="José Marichal" class="post-author-img">
                    <div class="post-author-info">
                        <h3>José Marichal</h3>
                        <p>Professor of Political Science at California Lutheran University. Author of <em>You Must Become an Algorithmic Problem</em> (Bristol University Press, 2025) and the forthcoming <em>Machine Liberalism</em> (2027).</p>
                        <a href="../index.html">Return to Home Overview →</a>
                    </div>
                </div>
            </article>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>© {datetime.now().year} José Marichal. All rights reserved.</p>
        </div>
    </footer>
</body>

</html>
"""


def update_blog_html(posts):
    """Regenerates static post cards in blog.html for no-JS fallback and SEO."""
    if not os.path.exists(BLOG_HTML_PATH):
        return

    with open(BLOG_HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    cards_html = []
    for post in posts:
        tags_markup = "".join([f'<span class="blog-tag">{t}</span>' for t in post.get("tags", [])])
        card = f"""                    <article class="blog-card" data-tags="{','.join(post.get('tags', []))}">
                        <div class="blog-card-meta">
                            <span class="meta-date">{post.get('displayDate', '')}</span>
                            <span class="meta-dot">•</span>
                            <span>{post.get('readTime', '')}</span>
                        </div>
                        <h2 class="blog-card-title"><a href="{post.get('url', '#')}" style="color:inherit;text-decoration:none;">{post.get('title', '')}</a></h2>
                        <p class="blog-card-excerpt">{post.get('excerpt', '')}</p>
                        <div class="blog-card-footer">
                            <div class="blog-tags">
                                {tags_markup}
                            </div>
                            <a href="{post.get('url', '#')}" class="read-link">Read Dispatch →</a>
                        </div>
                    </article>"""
        cards_html.append(card)

    rendered_cards = "\n\n".join(cards_html) if cards_html else """                    <div style="text-align: center; padding: 3rem; background-color: var(--surface-color); border-radius: 8px;">
                        <p>Total entries: 0</p>
                        <p style="color: var(--text-main);">Check back soon for upcoming field notes.</p>
                    </div>"""

    container_pattern = r'(<!-- BLOG_POSTS_START -->)(.*?)(<!-- BLOG_POSTS_END -->)'
    if re.search(container_pattern, html, re.DOTALL):
        html = re.sub(container_pattern, f'\\1\n{rendered_cards}\n                    \\3', html, flags=re.DOTALL)
    else:
        list_pattern = r'(<div class="blog-list"[^>]*>)(.*?)(</div>\s*</div>\s*</div>\s*</main>)'
        if re.search(list_pattern, html, re.DOTALL):
            html = re.sub(
                list_pattern,
                f'\\1\n<!-- BLOG_POSTS_START -->\n{rendered_cards}\n<!-- BLOG_POSTS_END -->\n\\3',
                html,
                flags=re.DOTALL
            )

    with open(BLOG_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)


def process_raw_text(raw_content, title=None, tags=None, date_override=None, excerpt_override=None, filename_hint="post"):
    """Core logic to transform any raw text or markdown into a published blog post."""
    metadata, body = parse_frontmatter(raw_content)

    # Resolve Title
    post_title = title or metadata.get("title")
    lines = body.splitlines()
    while lines and not lines[0].strip():
        lines.pop(0)

    if lines and lines[0].strip().startswith("#"):
        h_text = re.sub(r"^#+\s*", "", lines[0].strip()).strip()
        if not post_title or post_title.lower() == h_text.lower():
            post_title = post_title or h_text
            lines.pop(0)
            body = "\n".join(lines).strip()
    elif not post_title:
        if lines and len(lines[0].strip()) < 100:
            post_title = lines[0].strip()
            lines.pop(0)
            body = "\n".join(lines).strip()
        else:
            post_title = filename_hint.replace("_", " ").replace("-", " ").title()

    if not post_title:
        post_title = "Untitled Dispatch"

    # Resolve Date
    raw_date = date_override or metadata.get("date")
    if raw_date:
        if isinstance(raw_date, datetime):
            post_date = raw_date
        else:
            try:
                post_date = datetime.strptime(str(raw_date).strip(), "%Y-%m-%d")
            except Exception:
                post_date = datetime.now()
    else:
        post_date = datetime.now()

    date_str = post_date.strftime("%Y-%m-%d")
    display_date = post_date.strftime("%B %d, %Y")

    # Resolve Tags
    if tags:
        if isinstance(tags, str):
            post_tags = [t.strip() for t in tags.split(",") if t.strip()]
        else:
            post_tags = tags
    elif metadata.get("tags"):
        if isinstance(metadata["tags"], str):
            post_tags = [t.strip() for t in metadata["tags"].split(",") if t.strip()]
        else:
            post_tags = metadata["tags"]
    else:
        post_tags = ["Machine Liberalism", "Algorithmic Politics"]

    # Resolve Excerpt
    excerpt = excerpt_override or metadata.get("excerpt")
    if not excerpt:
        excerpt = clean_text_for_excerpt(body, 180)

    # Reading time
    read_time = calculate_reading_time(body)

    # Slug and Filename
    slug_name = metadata.get("slug") or slugify(post_title)
    filename = f"{date_str}-{slug_name}.html"
    post_file_path = os.path.join(POSTS_DIR, filename)
    relative_url = f"posts/{filename}"

    # Convert Markdown to HTML
    body_html = markdown_to_html(body)

    # Generate Post HTML
    post_html = generate_post_html(
        title=post_title,
        date_str=date_str,
        display_date=display_date,
        read_time=read_time,
        tags=post_tags,
        body_html=body_html,
        slug=slug_name
    )

    with open(post_file_path, "w", encoding="utf-8") as f:
        f.write(post_html)

    print(f"Created post: {relative_url}")

    # Update posts.json metadata
    posts = load_posts_metadata()
    # Remove existing entry if updating
    posts = [p for p in posts if p.get("slug") != f"{date_str}-{slug_name}"]

    new_entry = {
        "id": slug_name,
        "slug": f"{date_str}-{slug_name}",
        "title": post_title,
        "date": date_str,
        "displayDate": display_date,
        "excerpt": excerpt,
        "tags": post_tags,
        "readTime": read_time,
        "url": relative_url
    }
    posts.insert(0, new_entry)
    save_posts_metadata(posts)

    # Update blog.html
    update_blog_html(posts)
    print("Updated posts.json and blog.html successfully.")

    return post_file_path, new_entry


def process_file(filepath, title=None, tags=None, date_override=None):
    """Parses a file and produces a blog post."""
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        raw_content = f.read()
    hint = os.path.splitext(os.path.basename(filepath))[0]
    return process_raw_text(raw_content, title=title, tags=tags, date_override=date_override, filename_hint=hint)


def get_clipboard_text():
    """Retrieve text from OS clipboard."""
    try:
        res = subprocess.run(
            ["powershell", "-NoProfile", "-Command", "Get-Clipboard"],
            capture_output=True,
            text=True,
            check=True
        )
        return res.stdout.strip()
    except Exception:
        pass
    try:
        import tkinter as tk
        root = tk.Tk()
        root.withdraw()
        return root.clipboard_get().strip()
    except Exception:
        pass
    return ""


def process_all_drafts():
    """Scans blog_drafts/ and processes all pending .txt and .md files."""
    files = [
        f for f in os.listdir(DRAFTS_DIR)
        if os.path.isfile(os.path.join(DRAFTS_DIR, f)) and f.lower().endswith((".txt", ".md", ".markdown"))
    ]

    if not files:
        print("No pending drafts found in blog_drafts/")
        return []

    processed = []
    for filename in files:
        filepath = os.path.join(DRAFTS_DIR, filename)
        print(f"Processing draft: {filename}...")
        try:
            post_path, entry = process_file(filepath)
            processed.append(entry)
            dest_path = os.path.join(PUBLISHED_DRAFTS_DIR, filename)
            shutil.move(filepath, dest_path)
            print(f"Moved {filename} to blog_drafts/published/")
        except Exception as e:
            print(f"Error processing {filename}: {e}", file=sys.stderr)

    return processed


def git_commit_and_push(commit_msg="Publish new blog post"):
    """Optionally commits and pushes changes to main branch."""
    print("Committing and pushing to git...")
    try:
        subprocess.run(["git", "add", "blog.html", "posts/", "blog_drafts/"], cwd=ROOT_DIR, check=True)
        subprocess.run(["git", "commit", "-m", commit_msg], cwd=ROOT_DIR, check=True)
        subprocess.run(["git", "push", "origin", "main"], cwd=ROOT_DIR, check=True)
        print("Successfully pushed to GitHub Pages!")
    except Exception as e:
        print(f"Git push failed: {e}", file=sys.stderr)


def start_local_server(port=8080):
    """Launches a local publisher server so publish.html can directly publish and push with 1 click."""
    import http.server
    import webbrowser

    class PublishHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=ROOT_DIR, **kwargs)

        def do_POST(self):
            if self.path == "/api/publish":
                length = int(self.headers.get("Content-Length", 0))
                body_bytes = self.rfile.read(length)
                try:
                    data = json.loads(body_bytes.decode("utf-8"))
                    text = data.get("content", "")
                    title = data.get("title") or None
                    tags = data.get("tags") or None
                    date_val = data.get("date") or None
                    excerpt_val = data.get("excerpt") or None
                    do_push = data.get("push", True)

                    post_path, entry = process_raw_text(
                        text,
                        title=title,
                        tags=tags,
                        date_override=date_val,
                        excerpt_override=excerpt_val,
                        filename_hint="post"
                    )

                    if do_push:
                        git_commit_and_push(f"Publish blog post: {entry.get('title')}")

                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        "status": "success",
                        "post": entry,
                        "url": entry.get("url")
                    }).encode("utf-8"))
                except Exception as e:
                    self.send_response(500)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            else:
                self.send_response(404)
                self.end_headers()

    server = http.server.HTTPServer(("127.0.0.1", port), PublishHandler)
    url = f"http://localhost:{port}/publish.html"
    print(f"\n=======================================================")
    print(f"🚀 Publishing Studio running at: {url}")
    print(f"Paste text into the browser and click Publish to deploy!")
    print(f"Press Ctrl+C to stop the server.")
    print(f"=======================================================\n")
    try:
        webbrowser.open(url)
    except Exception:
        pass
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        server.server_close()


def main():
    parser = argparse.ArgumentParser(description="Blog publishing tool for josemarichal.github.io")
    parser.add_argument("file", nargs="?", help="Path to text or markdown draft file")
    parser.add_argument("--all-drafts", action="store_true", help="Process all files in blog_drafts/")
    parser.add_argument("--clipboard", "-c", action="store_true", help="Publish text currently in your clipboard")
    parser.add_argument("--paste", "-p", action="store_true", help="Paste text interactively in the terminal")
    parser.add_argument("--server", "-s", action="store_true", help="Launch local browser studio on http://localhost:8080")
    parser.add_argument("--port", type=int, default=8080, help="Port for local server (default: 8080)")
    parser.add_argument("--title", help="Explicit post title")
    parser.add_argument("--tags", help="Comma-separated tags")
    parser.add_argument("--date", help="Date in YYYY-MM-DD format")
    parser.add_argument("--push", action="store_true", help="Commit and push changes to GitHub Pages")

    args = parser.parse_args()

    if args.server:
        start_local_server(args.port)
        return

    if args.clipboard:
        clip_text = get_clipboard_text()
        if not clip_text:
            print("Error: Clipboard is empty.", file=sys.stderr)
            sys.exit(1)
        print(f"Found {len(clip_text)} characters in clipboard.")
        post_path, entry = process_raw_text(clip_text, title=args.title, tags=args.tags, date_override=args.date)
        if args.push:
            git_commit_and_push(f"Publish blog post: {entry.get('title')}")
        else:
            choice = input(f"Commit and push '{entry.get('title')}' to GitHub Pages? [Y/n]: ").strip().lower()
            if choice in ("", "y", "yes"):
                git_commit_and_push(f"Publish blog post: {entry.get('title')}")
        return

    if args.paste:
        print("Paste your text below. When done, press Enter, then Ctrl+Z (Windows) or Ctrl+D (Mac/Linux) and Enter:")
        lines = sys.stdin.read()
        if not lines.strip():
            print("No text received.")
            sys.exit(1)
        post_path, entry = process_raw_text(lines, title=args.title, tags=args.tags, date_override=args.date)
        if args.push:
            git_commit_and_push(f"Publish blog post: {entry.get('title')}")
        else:
            choice = input(f"Commit and push '{entry.get('title')}' to GitHub Pages? [Y/n]: ").strip().lower()
            if choice in ("", "y", "yes"):
                git_commit_and_push(f"Publish blog post: {entry.get('title')}")
        return

    if args.all_drafts:
        processed = process_all_drafts()
        if processed and args.push:
            git_commit_and_push(f"Publish {len(processed)} blog posts from drafts")
    elif args.file:
        if not os.path.exists(args.file):
            print(f"Error: File '{args.file}' not found.", file=sys.stderr)
            sys.exit(1)
        post_path, entry = process_file(args.file, title=args.title, tags=args.tags, date_override=args.date)
        if args.push:
            git_commit_and_push(f"Publish blog post: {entry.get('title')}")
    else:
        # Interactive mode or check drafts
        print("=== José Marichal Blog Publisher ===")
        print("Options:")
        print("  1. Process clipboard content:  python publish_post.py --clipboard --push")
        print("  2. Open browser studio:        python publish_post.py --server")
        print("  3. Process a file:             python publish_post.py <path> --push")
        print("  4. Process all drafts:         python publish_post.py --all-drafts --push\n")

        clip_text = get_clipboard_text()
        if clip_text:
            first_line = clip_text.splitlines()[0][:60] if clip_text.splitlines() else "content"
            print(f"Clipboard preview: \"{first_line}...\" ({len(clip_text)} chars)")
            choice = input("Do you want to publish the text currently in your clipboard? [Y/n]: ").strip().lower()
            if choice in ("", "y", "yes"):
                post_path, entry = process_raw_text(clip_text)
                choice_push = input(f"Push '{entry.get('title')}' to GitHub Pages? [Y/n]: ").strip().lower()
                if choice_push in ("", "y", "yes"):
                    git_commit_and_push(f"Publish blog post: {entry.get('title')}")
                return

        file_input = input("Enter path to draft text or markdown file (or press Enter to cancel): ").strip().strip("'\"")
        if file_input and os.path.exists(file_input):
            post_path, entry = process_file(file_input)
            choice = input("Commit and push to GitHub Pages now? [Y/n]: ").strip().lower()
            if choice in ("", "y", "yes"):
                git_commit_and_push(f"Publish blog post: {entry.get('title')}")


if __name__ == "__main__":
    main()
