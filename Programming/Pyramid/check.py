PYRAMID = '''    49 
   40 100 
  62 26 75 
 34 66 64 52 
32 27 75 66 55'''

ROWS = 5

def maximum_path_sum(pyramid):
  def dfs(row, col, current_sum):
    if row == len(pyramid) - 1:
      return current_sum + pyramid[row][col]

    left_sum = dfs(row + 1, col, current_sum + pyramid[row][col])
    right_sum = dfs(row + 1, col + 1, current_sum + pyramid[row][col])

    return max(left_sum, right_sum)

  return dfs(0, 0, 0)

def convert_array(triangle: str) -> list:
  triangle_list: list = []
  for _ in triangle.split('\n'):
    triangle_list.append([int(num) for num in _.split(' ') if num != ''])
  
  for _ in triangle_list:
    while len(_) < ROWS:
      _.append('0')
  
  return triangle_list

print(convert_array(PYRAMID))
a = calculate_max_path_sum(PYRAMID)

print(a)
#path_sum_str = a 

#s: int = sum([int(path_sum_str[i:i+2]) for i in range(0, len(path_sum_str), 2)])
#print(s)
