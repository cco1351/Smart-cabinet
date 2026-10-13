from pathlib import Path
import zipfile

root = Path(__file__).resolve().parent.parent
output = root.parent / 'smart-cabinet-uniapp.zip'
allowed = ['src', 'server', 'tools', 'tests', 'docs', 'reference', 'dist/build/mp-weixin']
files = [root / name for name in ['README.md', 'package.json', 'package-lock.json', 'vite.config.js', 'index.html', '.npmrc', '.gitignore']]
for folder in allowed:
    files += [p for p in (root / folder).rglob('*') if p.is_file() and 'server/data' not in p.relative_to(root).as_posix() and 'failure' not in p.name]
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in files:
        archive.write(file, Path(root.name) / file.relative_to(root))
print(f'{output}: {output.stat().st_size} bytes, {len(files)} files')
