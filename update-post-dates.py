#!/usr/bin/env python3
"""
Update all blog post dates by moving them back one month.
This script updates both the frontmatter date and the folder name.
"""

import os
import re
from datetime import datetime, timedelta
from pathlib import Path
import shutil

def subtract_one_month(date_str):
    """Subtract one month from a date string in YYYY-MM-DD format."""
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')
    # Subtract approximately 30 days (one month)
    new_date = date_obj - timedelta(days=30)
    return new_date.strftime('%Y-%m-%d')

def update_frontmatter_date(file_path):
    """Update the date in the markdown frontmatter."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and replace the date in frontmatter
    pattern = r'(date:\s*["\']?)(\d{4}-\d{2}-\d{2})(["\']?)'

    def replace_date(match):
        prefix = match.group(1)
        old_date = match.group(2)
        suffix = match.group(3)
        new_date = subtract_one_month(old_date)
        return f"{prefix}{new_date}{suffix}"

    new_content = re.sub(pattern, replace_date, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    posts_dir = Path('/Users/whua/Desktop/projects/tech-blog/public/posts')

    # Get all post directories
    post_dirs = [d for d in posts_dir.iterdir() if d.is_dir()]

    # Process each post directory
    for post_dir in post_dirs:
        dir_name = post_dir.name

        # Extract date from directory name (format: YYYY-MM-DD-slug)
        match = re.match(r'(\d{4}-\d{2}-\d{2})-(.+)', dir_name)
        if not match:
            print(f"Skipping {dir_name} - doesn't match expected format")
            continue

        old_date = match.group(1)
        slug = match.group(2)
        new_date = subtract_one_month(old_date)
        new_dir_name = f"{new_date}-{slug}"
        new_post_dir = posts_dir / new_dir_name

        print(f"Processing: {dir_name} -> {new_dir_name}")

        # Update frontmatter dates in all .md files before renaming
        for md_file in post_dir.glob('*.md'):
            update_frontmatter_date(md_file)
            print(f"  Updated date in {md_file.name}")

        # Rename directory
        if new_post_dir.exists():
            print(f"  Warning: {new_dir_name} already exists, skipping rename")
        else:
            post_dir.rename(new_post_dir)
            print(f"  Renamed directory to {new_dir_name}")

    print("\nAll posts have been updated!")

if __name__ == '__main__':
    main()
