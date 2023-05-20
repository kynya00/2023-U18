#!/usr/bin/env python3 
import random

ROWS: int = 30

class Pyramid:
  def __init__(self) -> None:
    self.triangle: dict = {}

  def generate_triangle(self) -> str:
    retdata: str = ''
    for row in range(1, ROWS + 1):
      for _ in range(ROWS - row, 0, -1):
        retdata += ' '
      for col in range(row):
        retdata += str(random.randint(10, 99)) + ' ' 
      retdata += '\n'
    return retdata

  def calculate_max_path_sum(self, triangle: str) -> int:
    triangle_list: list = []
    for _ in triangle.split('\n'):
      triangle_list.append([num for num in _.split(' ') if num != ''])
    if triangle_list[-1] == []:
      triangle_list = triangle_list[:-1]

    for _ in triangle_list:
      while len(_) < ROWS:
        _.append('0')

    dp = [[-1 for j in range(ROWS)] for i in range(ROWS)]
    return self.max_path_sum(triangle_list, ROWS, dp)

  def max_path_sum(self, tri: list, n: int, dp: list): 
    for j in range(n):
      dp[n-1][j] = tri[n-1][j]
 
    for i in range(n-2, -1, -1):
      for j in range(i, -1, -1):
        dp[i][j] = tri[i][j] + max(dp[i+1][j], dp[i+1][j+1])
 
    return dp[0][0] 

  def make_triangle_list(self, count: int) -> None:
    for _ in range(0, count):
      triangle = self.generate_triangle()
      path_sum_str = str(self.calculate_max_path_sum(triangle))
      max_path_sum: int = sum([int(path_sum_str[i:i+2]) for i in range(0, len(path_sum_str), 2)])

      self.triangle[_] = {
        'max_path_sum': max_path_sum,
        'data': triangle
      }
      

def print_flag() -> None:
  print('[+] Congratulations!!!, Here is your flag: HZU18{PR0GraMM1ng__1z_FFUN!!!_CONGRATZ}')

def banner() -> None:
  print('Welcome,\n')
  print('Find the maximum total from top to bottom')
  print('For example...')
  print('Input: ')
  print('''    49 
   40 69 
  62 26 75 
 34 66 64 52 
32 27 75 66 55''')
  print('Output: 332')
  print('Explanation: 49 -> 69 -> 75 -> 66 -> 75\n')

def run(prmd: Pyramid) -> None:
  banner()
  for k, v in prmd.triangle.items():
    print(f'[{k}] Pyramid: \n{v["data"]}')
    answer: int = int(input('Please enter, Maximum path sum>'))
    if answer == int(v['max_path_sum']):
      print('[+] Correct')
    else:
      print('[!] Wrong answer...')
      exit(0)
  print_flag()


if __name__ == '__main__':
  prmd = Pyramid()
  prmd.make_triangle_list(100)

  run(prmd)
