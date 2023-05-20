#!/usr/bin/env python3 
import random

ROWS: int = 5

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

  def maximum_path_sum(self, pyramid):
    def dfs(row, col, current_sum):
      if row == len(pyramid) - 1:
        return current_sum + int(pyramid[row][col])

      left_sum = dfs(row + 1, col, current_sum + pyramid[row][col])
      right_sum = dfs(row + 1, col + 1, current_sum + pyramid[row][col])

      return max(left_sum, right_sum)

    return dfs(0, 0, 0)

  def convert_array(self, triangle: str) -> list:
    triangle_list: list = []
    for _ in triangle.split('\n'):
      triangle_list.append([int(num) for num in _.split(' ') if num != ''])
    
    for _ in triangle_list:
      while len(_) < ROWS:
        _.append('0')
    
    return triangle_list[:-1]

  def make_triangle_list(self, count: int) -> None:
    for _ in range(0, count):
      triangle = self.generate_triangle()

      max_path_sum: int = self.maximum_path_sum(self.convert_array(triangle))
      print(max_path_sum)
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
  print('Explanation: 49 -> 69 -> 75 -> 64 -> 75\n')

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
  prmd.make_triangle_list(500)

  run(prmd)
