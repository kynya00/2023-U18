import os
import math
import random
import socket

flag = ""

with open("flag.txt") as flagFile:
    flag = flagFile.readline().strip()

def spin_reels():
    symbols = ["(^.^)", "(>.<)", "(O.O)", "(o.O)","(0.O)","(0.0)"]
    results = []
    
    for _ in range(5):
        symbol = random.choice(symbols)
        results.append(symbol)
    return results
    
def check_results(reels):
    for i in range(len(reels)):
        for j in range(i + 1, len(reels)):
            if reels[i] == reels[j]:
                return True
    return False

def connectionHandler(conn):
    conn.send("HZU18 2023 - Game Arena\n".encode())
    conn.send(f"Доод тал нь 2 адилхан таарсан бол 'win win win' таараагүй бол 'try again' гэж илгээгээд хонжвороо аваарай.\n".encode())
    tries = 50
    
    for i in range(tries):
        reels = spin_reels()
        conn.send(f"Тохирол: {reels}\n".encode())
        answer = conn.recv(1024).decode().strip()
        if str(answer) != 'win win win' and answer != 'try again':
            conn.send(f"Уучлаарай, тоглоомын дүрмээ сайн уншаарай -_-\n".encode())
            conn.close()
            break
        if i == 49:
            conn.send(f"Баяр хүргэе {flag}\n".encode())
            conn.close()
        if answer == 'win win win' and check_results(reels):
            conn.send("Баяр хүргэе! хонжвортоо хүртэл тоглоод байгаарай (^_^)\n".encode())
        elif answer == 'try again' and not check_results(reels):
            conn.send("Тохирол таарсангүй! Хонжвортоо хүртэл тоглоод л байгаарай (^_^)\n".encode())
        else:
            conn.send("Уучлаарай, тоглоомын дүрмээ сайн уншаарай.\n".encode())
            conn.close()
        
    conn.send(f"Bad luck try again -_-".encode())
    
def main():
    port = int(os.environ.get("PORT", "7711"))
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("0.0.0.0", port))
        s.listen()
        while True:
            conn, addr = s.accept()
            connectionHandler(conn)

if __name__ == "__main__":
    main()