import os
import math
import random
import socket
import string

flag = ""

with open("flag.txt") as flagFile:
    flag = flagFile.readline().strip()

def generate_random_word(length):
    letters = string.ascii_lowercase
    word = ''.join(random.choice(letters) for _ in range(length))
    return word


def check(word, reversed):
    reversed_word = word[::-1]
    if reversed_word == reversed:
        return True
    else:
        return False

def connectionHandler(conn):
    conn.send("Please, help me to reverse some strings\n".encode())
    random_words = [generate_random_word(5) for _ in range(50)]
    count = 0
    for word in random_words:
        print("given word: " + word)
        conn.send(f"String: {word}\n".encode())
        answer = conn.recv(1024).decode().strip()
        print("answer is: " + answer)
        if check(word, answer):
            count += 1
            conn.send(f"Goodjob!\n".encode())
            if count == 49:
                conn.send(f"You earned it: {flag}".encode())
                conn.close()
        else:
            conn.send(f"-_-\n".encode())
            conn.close()
            break
    conn.send(f"Try again.".encode())
    
def main():
    port = int(os.environ.get("PORT", "5000"))
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("0.0.0.0", port))
        s.listen()
        while True:
            conn, addr = s.accept()
            connectionHandler(conn)

if __name__ == "__main__":
    main()