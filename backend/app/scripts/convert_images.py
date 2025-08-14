import os
import shutil
from pathlib import Path

def detect_image_format(file_path):
    """
    Detect the actual image format by reading file headers (magic numbers)
    """
    try:
        with open(file_path, 'rb') as f:
            header = f.read(12)  # Read first 12 bytes
        
        # Check for different image formats
        if header.startswith(b'\xff\xd8\xff'):
            return 'jpg'
        elif header.startswith(b'\x89PNG\r\n\x1a\n'):
            return 'png'
        elif header.startswith(b'GIF87a') or header.startswith(b'GIF89a'):
            return 'gif'
        elif header[8:12] == b'WEBP':
            return 'webp'
        elif header.startswith(b'BM'):
            return 'bmp'
        elif header.startswith(b'\x00\x00\x01\x00') or header.startswith(b'\x00\x00\x02\x00'):
            return 'ico'
        elif header.startswith(b'<svg') or b'<svg' in header:
            return 'svg'
        else:
            return None
            
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

def convert_do_files(directory_path, copy_files=True):
    """
    Convert .do files to proper image extensions
    
    Args:
        directory_path (str): Path to directory containing .do files
        copy_files (bool): If True, creates copies with new extensions. 
                          If False, renames original files.
    """
    directory = Path(directory_path)
    
    if not directory.exists():
        print(f"Directory {directory_path} does not exist!")
        return
    
    do_files = list(directory.glob("*.do"))
    
    if not do_files:
        print("No .do files found in the directory!")
        return
    
    print(f"Found {len(do_files)} .do files")
    print("-" * 50)
    
    converted_count = 0
    
    for do_file in do_files:
        print(f"Processing: {do_file.name}")
        
        # Detect the actual format
        image_format = detect_image_format(do_file)
        
        if image_format:
            # Create new filename with proper extension
            new_name = do_file.stem + '.' + image_format
            new_path = do_file.parent / new_name
            
            try:
                if copy_files:
                    # Copy file with new extension
                    shutil.copy2(do_file, new_path)
                    print(f"  → Copied to: {new_name}")
                else:
                    # Rename original file
                    do_file.rename(new_path)
                    print(f"  → Renamed to: {new_name}")
                
                converted_count += 1
                
            except Exception as e:
                print(f"  → Error: {e}")
        else:
            print(f"  → Unknown format (not a recognized image)")
    
    print("-" * 50)
    print(f"Successfully converted {converted_count} out of {len(do_files)} files")

def analyze_do_files(directory_path):
    """
    Analyze .do files without converting them
    """
    directory = Path(directory_path)
    
    if not directory.exists():
        print(f"Directory {directory_path} does not exist!")
        return
    
    do_files = list(directory.glob("*.do"))
    
    if not do_files:
        print("No .do files found in the directory!")
        return
    
    print(f"Analyzing {len(do_files)} .do files:")
    print("-" * 50)
    
    format_counts = {}
    
    for do_file in do_files:
        image_format = detect_image_format(do_file)
        
        if image_format:
            format_counts[image_format] = format_counts.get(image_format, 0) + 1
            print(f"{do_file.name} → {image_format.upper()}")
        else:
            format_counts['unknown'] = format_counts.get('unknown', 0) + 1
            print(f"{do_file.name} → Unknown format")
    
    print("-" * 50)
    print("Summary:")
    for fmt, count in format_counts.items():
        print(f"  {fmt.upper()}: {count} files")

if __name__ == "__main__":
    # Example usage:
    
    # 1. Analyze files first (recommended)
    print("=== ANALYSIS MODE ===")
    directory_path = input("Enter the path to your directory with .do files: ").strip()
    analyze_do_files(directory_path)
    
    print("\n" + "="*60 + "\n")
    
    # 2. Ask user if they want to convert
    choice = input("Do you want to convert the files? (y/n): ").strip().lower()
    
    if choice == 'y':
        copy_choice = input("Create copies (c) or rename originals (r)? [c/r]: ").strip().lower()
        copy_files = copy_choice != 'r'
        
        print(f"\n=== CONVERSION MODE ({'COPYING' if copy_files else 'RENAMING'}) ===")
        convert_do_files(directory_path, copy_files)