# Blog Drafts & Automated Publishing

Drop any text file (`.txt` or `.md`) into this folder to publish it to your blog!

## How It Works

### Option 1: Upload via GitHub (Zero Setup / Works from Phone or Browser)
1. Go to your repository on GitHub: `https://github.com/josemarichal/github.io`
2. Open the `blog_drafts` folder.
3. Click **Add file** -> **Upload files**.
4. Drag and drop your text or markdown file (e.g., `my_notes.txt` or `essay.md`) and click **Commit changes**.
5. GitHub Actions will automatically:
   - Convert your text into a formatted HTML post in `posts/`.
   - Add it to `posts/posts.json` and `blog.html`.
   - Move the draft to `blog_drafts/published/`.
   - Your post is live on `josemarichal.github.io/blog.html`!

### Option 2: Run the Local Python Script
From your local project directory:
```bash
python publish_post.py "blog_drafts/my_post.txt" --push
```
Or process all drafts at once:
```bash
python publish_post.py --all-drafts --push
```

### Option 3: Browser Publisher Studio
Open `publish.html` in your browser to write, paste text, or drag-and-drop a file with live preview!

---

## Formatting Guidelines (Optional)
You can upload completely plain text, or you can add optional YAML frontmatter at the top:

```markdown
---
title: The Rise of Machine Liberalism
date: 2026-09-29
tags: [Machine Liberalism, Algorithmic Politics, AI]
excerpt: A brief summary of the main argument.
---

Your content goes here... Use headings (#, ##), bullet points, blockquotes (>), or regular paragraphs.
```

If you don't include frontmatter:
- The first line or `# Header` automatically becomes the title.
- The date automatically defaults to today.
- The first paragraph automatically becomes the summary.
