import sys
from PIL import Image, ImageDraw, ImageFont

def create_muthu_icons():
    # 512x512 canvas
    size = 512
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Dark rounded background badge
    # Corner radius
    radius = 110
    draw.rounded_rectangle([12, 12, size - 12, size - 12], radius=radius, fill=(8, 8, 8, 255), outline=(254, 197, 45, 120), width=6)

    # 2. Draw gold geometric 'M'
    # Coordinates for high-end bold architectural 'M'
    # Left stem: (96, 128) to (148, 384)
    # Right stem: (364, 128) to (416, 384)
    # Center vertex: (256, 310)
    # Top inner angles: (148, 128), (364, 128)
    
    gold_main = (254, 197, 45, 255)
    gold_light = (255, 243, 196, 255)

    m_poly = [
        (96, 384),   # bottom left outer
        (96, 128),   # top left outer
        (156, 128),  # top left inner
        (256, 280),  # center bottom valley
        (356, 128),  # top right inner
        (416, 128),  # top right outer
        (416, 384),  # bottom right outer
        (364, 384),  # bottom right inner stem
        (364, 204),  # right stem top inner
        (272, 344),  # center peak inner right
        (240, 344),  # center peak inner left
        (148, 204),  # left stem top inner
        (148, 384),  # bottom left inner stem
    ]
    draw.polygon(m_poly, fill=gold_main)

    # Center jewel dot
    draw.ellipse([256 - 12, 384 - 12, 256 + 12, 384 + 12], fill=gold_light)

    # Save outputs
    # 512x512 PNG
    img.save('public/apple-touch-icon.png', 'PNG')
    img.save('public/icon-512.png', 'PNG')
    
    # 192x192 PNG
    icon_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save('public/icon-192.png', 'PNG')

    # 32x32 PNG & ICO
    icon_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    icon_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
    img.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    
    print("Icons successfully generated.")

if __name__ == '__main__':
    create_muthu_icons()
