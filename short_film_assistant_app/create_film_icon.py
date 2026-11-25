import os
from PIL import Image, ImageDraw

def create_film_slate_icon():
    size = 256
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background rounded square with gold border
    margin = 12
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=48,
        fill="#0f172a",
        outline="#f59e0b",
        width=7
    )

    # Inner container card
    draw.rounded_rectangle(
        [margin + 8, margin + 8, size - margin - 8, size - margin - 8],
        radius=40,
        fill="#1e222d"
    )

    # Clapperboard body
    # Slate top hinge (diagonal striped bar)
    slate_left = 46
    slate_right = 210
    slate_top = 56
    slate_hinge_bottom = 98

    # Hinge background
    draw.rounded_rectangle(
        [slate_left, slate_top, slate_right, slate_hinge_bottom],
        radius=6,
        fill="#18181b",
        outline="#f59e0b",
        width=3
    )

    # Chevrons / diagonal stripes (amber & black)
    stripe_w = 26
    for x in range(slate_left - 20, slate_right + 30, stripe_w * 2):
        # Draw diagonal polygon
        pts = [
            (x, slate_top + 2),
            (x + stripe_w, slate_top + 2),
            (x + stripe_w - 18, slate_hinge_bottom - 2),
            (x - 18, slate_hinge_bottom - 2)
        ]
        # Clip inside bounds
        clipped = []
        for px, py in pts:
            cx = max(slate_left + 2, min(slate_right - 2, px))
            cy = max(slate_top + 2, min(slate_hinge_bottom - 2, py))
            clipped.append((cx, cy))
        if len(clipped) == 4 and clipped[0][0] < slate_right:
            draw.polygon(pts, fill="#f59e0b")

    # Re-stroke hinge outline
    draw.rounded_rectangle(
        [slate_left, slate_top, slate_right, slate_hinge_bottom],
        radius=6,
        outline="#f59e0b",
        width=3
    )

    # Clapperboard Lower Slate (board body)
    body_top = 104
    body_bottom = 204
    draw.rounded_rectangle(
        [slate_left, body_top, slate_right, body_bottom],
        radius=8,
        fill="#090d16",
        outline="#38bdf8",
        width=3
    )

    # Slate lines & Play Triangle
    draw.line([slate_left + 16, body_top + 24, slate_right - 16, body_top + 24], fill="#334155", width=2)
    draw.line([slate_left + 16, body_top + 48, slate_right - 16, body_top + 48], fill="#334155", width=2)

    # Glowing Cyan Play Button in Center
    center_x = 128
    center_y = 152
    tri_pts = [
        (center_x - 18, center_y - 24),
        (center_x - 18, center_y + 24),
        (center_x + 24, center_y)
    ]
    draw.polygon(tri_pts, fill="#38bdf8")

    # Small film reel perforations on side
    for py in [120, 145, 170, 195]:
        draw.rounded_rectangle([slate_left + 8, py - 6, slate_left + 16, py + 6], radius=2, fill="#f59e0b")
        draw.rounded_rectangle([slate_right - 16, py - 6, slate_right - 8, py + 6], radius=2, fill="#f59e0b")

    # Save multi-size ICO
    icon_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "film_icon.ico")
    img.save(
        icon_path,
        format="ICO",
        sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    )
    print(f"Created film icon: {icon_path}")

if __name__ == "__main__":
    create_film_slate_icon()

