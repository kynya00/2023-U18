#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

void readFlag(unsigned char** flag, size_t* flagSize) {
  FILE* file = fopen("flag.txt", "rb");
  if (file == NULL) {
    perror("Error opening file");
    exit(1);
  }
  
  fseek(file, 0, SEEK_END);
  *flagSize = ftell(file);
  fseek(file, 0, SEEK_SET);
  
  *flag = (unsigned char*)malloc(*flagSize);
  if (*flag == NULL) {
    perror("Error allocating memory");
    exit(1);
  }
  
  fread(*flag, 1, *flagSize, file);
  fclose(file);
}

void writeOutput(const unsigned char* kxor, const unsigned char* enc, size_t size) {
  FILE* file = fopen("output.txt", "w");
  if (file == NULL) {
    perror("Error opening file");
    exit(1);
  }
  
  fprintf(file, "kxor=");
  for (size_t i = 0; i < size; i++) {
    fprintf(file, "%hhu ", kxor[i]);
  }
  fprintf(file, "\n");
  
  fprintf(file, "enc=");
  for (size_t i = 0; i < size; i++) {
    fprintf(file, "%hhu ", enc[i]);
  }
  fprintf(file, "\n");
  
  fclose(file);
}

int main() {
  srand(time(NULL));
  
  unsigned char* flag;
  size_t flagSize;
  
  readFlag(&flag, &flagSize);
  
  unsigned char* key = (unsigned char*)malloc(flagSize);
  if (key == NULL) {
    perror("Error allocating memory");
    free(flag);
    exit(1);
  }
  
  for (size_t i = 0; i < flagSize; i++) {
    key[i] = rand() % 256 + 1;
  }
  
  unsigned char* kxor = (unsigned char*)malloc(flagSize);
  unsigned char* enc = (unsigned char*)malloc(flagSize);
  if (kxor == NULL || enc == NULL) {
    perror("Error allocating memory");
    free(flag);
    free(key);
    free(kxor);
    free(enc);
    exit(1);
  }
  
  for (size_t i = 0; i < flagSize; i++) {
    unsigned char k = 1;
    for (size_t j = i; j > 0; j--) {
      k ^= key[j];
    }
    kxor[i] = k;
    enc[i] = flag[i] ^ key[i];
  }
  
  writeOutput(kxor, enc, flagSize);
  
  free(flag);
  free(key);
  free(kxor);
  free(enc);
  
  return 0;
}