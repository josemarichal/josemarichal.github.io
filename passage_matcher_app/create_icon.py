import os
from PIL import Image, ImageDraw, ImageFont

def make_icon():
    size = 256
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Background rounded rectangle
    margin = 12
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=44,
        fill="#0f172a",
        outline="#38bdf8",
        width=6
    )

    # 2. Inner subtle glow/gradient effect
    draw.rounded_rectangle(
        [margin + 8, margin + 8, size - margin - 8, size - margin - 8],
        radius=36,
        fill="#1e293b"
    )

    # 3. Classical Pediment / Temple Roof (Marketplace of Ideas)
    # Triangular pediment
    roof_top = (128, 52)
    roof_left = (52, 98)
    roof_right = (204, 98)
    draw.polygon([roof_top, roof_left, roof_right], fill="#f59e0b")

    # Pediment architrave beam
    draw.rounded_rectangle([46, 98, 210, 110], radius=3, fill="#fbbf24")

    # 4. Columns (4 pillars representing the marketplace exchange)
    pillars_x = [62, 102, 142, 182]
    pillar_w = 12
    pillar_top = 114
    pillar_bottom = 176
    for px in pillars_x:
        draw.rounded_rectangle([px, pillar_top, px + pillar_w, pillar_bottom], radius=2, fill="#e2e8f0")

    # Capital and Base of pillars
    draw.rectangle([54, 176, 202, 186], fill="#cbd5e1")
    draw.rounded_rectangle([46, 186, 210, 198], radius=4, fill="#94a3b8")

    # 5. Glowing chart / market share sparkline overlay in cyan
    pts = [(62, 160), (95, 148), (128, 155), (160, 130), (194, 118)]
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i+1]], fill="#38bdf8", width=5)
    for pt in pts:
        draw.ellipse([pt[0] - 5, pt[1] - 5, pt[0] + 5, pt[1] + 5], fill="#38bdf8", outline="#ffffff", width=2)

    # Save multi-size ICO
    icon_path = os.path.join(os.path.dirname(__file__), "app_icon.ico")
    img.save(
        icon_path,
        format="ICO",
        sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    )
    print(f"Saved custom app icon to: {icon_path}")

if __name__ == "__main__":
    make_icon()
