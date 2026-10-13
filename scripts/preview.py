"""Preview the generated site's clean URLs in the same way as Vercel."""
import http.server
from pathlib import Path
import os
import sys
os.chdir(Path(__file__).resolve().parent.parent)
class Preview(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        resolved = super().translate_path(path)
        if Path(resolved + '.html').is_file():
            return resolved + '.html'
        return resolved
http.server.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv)>1 else 8772), Preview).serve_forever()
