PYRAMID = '''    49 
   40 69 
  62 26 75 
 34 66 64 52 
32 27 75 66 55'''

class Node:
  def __init__(self, data):
      self.data = data
      self.left = None
      self.right = None

def findMaxUtil(root):
  if root is None:
      return 0

  l = findMaxUtil(root.left)
  r = findMaxUtil(root.right)

  max_single = max(max(l, r) + root.data, root.data)

  max_top = max(max_single, l+r + root.data)

  findMaxUtil.res = max(findMaxUtil.res, max_top)

  return max_single

def findMaxSum(root):
  findMaxUtil.res = float("-inf")

  findMaxUtil(root)
  return findMaxUtil.res


def convert_array(triangle: str) -> list:
  triangle_list: list = []
  for _ in triangle.split('\n'):
    triangle_list.append([int(num) for num in _.split(' ') if num != ''])
  return triangle_list

def construct_binary_tree(arr):
  if not arr:
    return None

  root = Node(arr[0][0])
  queue = [(root, 0, 0)]

  while queue:
    node, row, col = queue.pop(0)

    if row + 1 < len(arr):
      left_child = Node(arr[row + 1][col])
      node.left = left_child
      queue.append((left_child, row + 1, col))

      right_child = Node(arr[row + 1][col + 1])
      node.right = right_child
      queue.append((right_child, row + 1, col + 1))

  return root

arr = convert_array(PYRAMID)
root = construct_binary_tree(arr)

print(findMaxUtil(root))