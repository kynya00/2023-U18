import base64
import codecs
spirit = 'HZU18{XXXXXXXXXXXXXXXXXX}'
def spirit_spinner():
    global spirit
    for floor in range(5):
            spirit = codecs.encode(spirit, 'rot_13')
            spirit = base64.b64encode(spirit.encode()).decode()
    return {"ciphertext": spirit}
print(spirit_spinner())

def decrypt(ciphertext):
    print("goodluck!")

