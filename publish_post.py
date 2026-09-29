#!/usr/bin/env python3
"""Convenience root wrapper for scripts/publish_post.py"""
import os
import sys
import subprocess

script_path = os.path.join(os.path.dirname(__file__), "scripts", "publish_post.py")

if __name__ == "__main__":
    cmd = [sys.executable, script_path] + sys.argv[1:]
    sys.exit(subprocess.call(cmd))
