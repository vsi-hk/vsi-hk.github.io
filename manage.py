import http.server
import socketserver
import os
import sys
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ChangeHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.is_directory:
            return
        print(f"Detected change in {event.src_path}, reloading...")
        # In a real-world scenario, you'd trigger a browser reload here.
        # For this script, we'll just print a message.

def run_server():
    PORT = 8000
    Handler = NoCacheHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://127.0.0.1:{PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "runserver":
        event_handler = ChangeHandler()
        observer = Observer()
        observer.schedule(event_handler, '.', recursive=True)
        observer.start()
        
        try:
            run_server()
        except KeyboardInterrupt:
            observer.stop()
        observer.join()
    else:
        print("Usage: python manage.py runserver")
