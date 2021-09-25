import re


def filter_email(email):
    return re.sub(r'[^a-zA-Z0-9.\-]', '', email)
