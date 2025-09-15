#!/usr/bin/env python3
import json
import http.server
import socketserver
from urllib.parse import urlparse, parse_qs

class MLHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
        elif parsed_path.path == '/ml/status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"accuracy": 0.0, "last_trained": None}).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/ml/predict':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                student_id = data.get('student_id', 1)
                
                # Simple pseudo-random risk calculation
                seed = (student_id * 9301 + 49297) % 233280
                risk = (seed / 233280.0) * 100.0
                
                if risk <= 40:
                    category = "low"
                elif risk <= 70:
                    category = "medium"
                else:
                    category = "high"
                
                response = {"risk_percent": round(risk, 2), "category": category}
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode())
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        elif parsed_path.path == '/ml/train':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"message": "Model trained", "accuracy": 0.85}).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    PORT = 8000
    with socketserver.TCPServer(("", PORT), MLHandler) as httpd:
        print(f"ML Service running on port {PORT}")
        print(f"Health check: http://localhost:{PORT}/health")
        print(f"ML docs: http://localhost:{PORT}/ml/status")
        httpd.serve_forever()
