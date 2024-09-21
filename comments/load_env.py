from pathlib import Path
import environ
import os

BASE_DIR = Path(__file__).resolve().parent
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

env = environ.Env(DEBUG=(bool, False))
