PYRAMID = '''    49 
   40 69 
  62 26 75 
 34 66 64 52 
32 27 75 66 55'''

ROWS = 5

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

a = (calculate_max_path_sum(PYRAMID))
path_sum_str = a
s: int = sum([int(path_sum_str[i:i+2]) for i in range(0, len(path_sum_str), 2)])
print(s)
