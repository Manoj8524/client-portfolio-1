import json
import os

content_path = 'src/data/siteContent.json'
posters_path = 'src/data/filmPostersData.json'

with open(content_path, 'r', encoding='utf-8') as f:
    content = json.load(f)

with open(posters_path, 'r', encoding='utf-8') as f:
    posters_data = json.load(f)

cached_posters = set(os.listdir('public/film_posters_cache')) if os.path.exists('public/film_posters_cache') else set()
existing_posters_map = {p['id']: p for p in content.get('works', {}).get('projects', [])}

studios = [
    'Aashirvad Cinemas', 'Wayfarer Films', 'Hombale Films', 'Mammootty Kampany',
    'Friday Film House', 'Sony Pictures India', 'E4 Entertainment', 'Central Pictures',
    'Baweja Studios', 'Geetha Arts', 'Mythri Movie Makers', 'Sithara Entertainments'
]

directors = [
    'Lokesh', 'Prashanth', 'Amal Neerad', 'Jeethu Joseph', 'Mahesh',
    'Rajamouli', 'Vysakh', 'Kiran', 'Shashank', 'Mathew', 'Anil', 'Gokul'
]

all_projects = []

# 1. Add all 30 film posters
for i, item in enumerate(posters_data):
    p_id = f"poster_{item['id']}"
    cached_name = f"poster_{item['id']}.webp"
    img_src = f"/film_posters_cache/{cached_name}" if cached_name in cached_posters else item.get('image', '')
    
    if p_id in existing_posters_map:
        proj = existing_posters_map[p_id]
        proj['image'] = img_src
        all_projects.append(proj)
    else:
        all_projects.append({
            'id': p_id,
            'title': item.get('film_name', f"Film Poster {item['id']}"),
            'category': 'FILM POSTERS',
            'year': str(item.get('year', '2026')),
            'image': img_src,
            'director': directors[i % len(directors)],
            'client': studios[i % len(studios)],
            'awards': 'Official Key Art' if i % 2 == 0 else 'Theatrical Poster',
            'featured': i < 6,
            'aspectRatio': 'default',
            'objectPosition': 'center'
        })

# 2. Add Branding Projects
branding_projects = [
    {
        'id': 'work_card_1',
        'title': 'Matte Obsidian Brand System',
        'category': 'BRANDING',
        'year': '2025',
        'image': '/extracted_assets/work/work_card_1.webp',
        'director': 'Muthu Studio',
        'client': 'Obsidian Luxe',
        'awards': 'Identity Design Gold',
        'featured': True,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    },
    {
        'id': 'work_card_4',
        'title': 'Aether Visual Identity & Guidelines',
        'category': 'BRANDING',
        'year': '2025',
        'image': '/extracted_assets/work/work_card_4.webp',
        'director': 'Muthu Studio',
        'client': 'Aether Labs',
        'awards': 'Brand Architecture Award',
        'featured': True,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    },
    {
        'id': 'work_card_5',
        'title': 'Kochi Biennale Monograph Branding',
        'category': 'BRANDING',
        'year': '2025',
        'image': '/extracted_assets/work/work_card_5.webp',
        'director': 'Muthu Studio',
        'client': 'Biennale Foundation',
        'awards': 'Editorial Selection',
        'featured': False,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    },
    {
        'id': 'work_card_6',
        'title': 'Luxe Atelier Minimal Packaging',
        'category': 'BRANDING',
        'year': '2026',
        'image': '/extracted_assets/work/work_card_6.webp',
        'director': 'Muthu Studio',
        'client': 'Atelier Couture',
        'awards': 'Packaging Excellence',
        'featured': False,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    }
]

# 3. Add Social Media Creatives
social_projects = [
    {
        'id': 'work_card_2',
        'title': 'Cinema Festival Social Suite',
        'category': 'SOCIAL MEDIA CREATIVES',
        'year': '2025',
        'image': '/extracted_assets/work/work_card_2.webp',
        'director': 'Muthu Studio',
        'client': 'CineCulture',
        'awards': 'Viral Reach Award',
        'featured': True,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    },
    {
        'id': 'work_social_2',
        'title': 'Dynamic Reel Campaign Visuals',
        'category': 'SOCIAL MEDIA CREATIVES',
        'year': '2025',
        'image': '/extracted_assets/work/work_07_Layer_3_copy_2.webp',
        'director': 'Muthu Studio',
        'client': 'BoxOffice Buzz',
        'awards': 'Social Impact Gold',
        'featured': False,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    },
    {
        'id': 'work_social_3',
        'title': 'Character Announcement Cards',
        'category': 'SOCIAL MEDIA CREATIVES',
        'year': '2026',
        'image': '/extracted_assets/work/work_09_Layer_3_copy_3.webp',
        'director': 'Muthu Studio',
        'client': 'Star Studios',
        'awards': 'Launch Campaign',
        'featured': False,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    }
]

# 4. Add Print & Ads Projects
print_projects = [
    {
        'id': 'work_card_3',
        'title': 'Editorial Print Exhibition',
        'category': 'PRINT & ADS',
        'year': '2025',
        'image': '/extracted_assets/work/work_card_3.webp',
        'director': 'Muthu Studio',
        'client': 'Galleria Art',
        'awards': 'Print Gold Award',
        'featured': True,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    },
    {
        'id': 'work_print_2',
        'title': 'Times Cinema Full-Page Feature',
        'category': 'PRINT & ADS',
        'year': '2025',
        'image': '/extracted_assets/work/work_13_Layer_3_copy_3.webp',
        'director': 'Muthu Studio',
        'client': 'Cinema Times',
        'awards': 'Full Spread Feature',
        'featured': False,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    },
    {
        'id': 'work_print_3',
        'title': 'Grand Theatrical Standee Art',
        'category': 'PRINT & ADS',
        'year': '2026',
        'image': '/extracted_assets/work/work_15_Screenshot_2026-10-11_at_1_00_25_PM.webp',
        'director': 'Muthu Studio',
        'client': 'Multiplex Media',
        'awards': 'Theatrical Display',
        'featured': False,
        'aspectRatio': 'default',
        'objectPosition': 'center'
    }
]

all_projects.extend(branding_projects)
all_projects.extend(social_projects)
all_projects.extend(print_projects)

content['works']['projects'] = all_projects

with open(content_path, 'w', encoding='utf-8') as f:
    json.dump(content, f, indent=2, ensure_ascii=False)

print(f"Successfully seeded {len(all_projects)} total projects into {content_path}!")
print(f"- Film posters: {len(posters_data)}")
print(f"- Branding: {len(branding_projects)}")
print(f"- Social Media: {len(social_projects)}")
print(f"- Print & Ads: {len(print_projects)}")
