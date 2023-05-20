PYRAMID = '''    49 
   40 69 
  62 26 75 
 34 66 64 52 
32 27 75 66 55'''



def convert_array(triangle: str) -> list:
  triangle_list: list = []
  for _ in triangle.split('\n'):
    triangle_list.append([int(num) for num in _.split(' ') if num != ''])

  return triangle_list


newArray = convert_array(PYRAMID)

for i in range(5-1):
  array1 = newArray[-1]
  array2 = newArray[-2]
  for j in range(len(array2)):
      array2[j] += max(array1[j], array1[j+1])
  newArray.pop(-1)
  newArray[-1] = array2

print(newArray)