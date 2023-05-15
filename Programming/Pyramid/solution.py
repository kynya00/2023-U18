from pwn import * 

io = remote('localhost', 1337)

ROWS = 30

def calculate_max_path_sum(triangle: str) -> int:
  triangle_list: list = []
  for _ in triangle.split('\n'):
    triangle_list.append([num for num in _.split(' ') if num != ''])
  #triangle_list = triangle_list[:-1]

  for _ in triangle_list:
    while len(_) < ROWS:
      _.append('0')

  dp = [[-1 for j in range(ROWS)] for i in range(ROWS)]
  return max_path_sum(triangle_list, ROWS, dp)

def max_path_sum(tri: list, n: int, dp: list): 
  for j in range(n):
    dp[n-1][j] = tri[n-1][j]
 
  for i in range(n-2, -1, -1):
    for j in range(i, -1, -1):
      dp[i][j] = tri[i][j] + max(dp[i+1][j], dp[i+1][j+1])
 
  return dp[0][0]

while 1:
  data = io.recv()
  if b'HZ' in data:
    print(data)
    exit(0)
  data = data.split(b'Pyramid: \n')[1].split(b'\n\nPlease enter, Maximum path sum>')[0].decode()
  path_sum_str = str(calculate_max_path_sum(data))                     
  s: int = sum([int(path_sum_str[i:i+2]) for i in range(0, len(path_sum_str), 2)])
  io.sendline(str(s).encode())
