#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void setup(){
  setvbuf(stderr, NULL, _IONBF, 0);
  setvbuf(stdout, NULL, _IONBF, 0);
}

char *readSecret(char *secret){
  FILE *f = fopen("/secret.txt", "r");
  if (NULL == f) {
    puts("Can't open secret.txt");
    exit(0);
  }

  fgets(secret, 63, f);
  return secret;
}

int main() {
  setup();
  
  int luckynum;
  int leet=0x37;

  char input[64];
  char secret[64];

  puts("[i] Read secret...");
  strcpy(readSecret(secret), secret);

  puts("[+] Stack view: ");
  write(1, input, leet);

  puts("\nLucky number > ");
  scanf("%lld", &luckynum);

  puts("[+] Another one: ");
  write(1, input, leet);

  puts("Please tell me, your wish > ");
  scanf("%64s", &input);

  if (strcmp(input, secret) == 0) {
    puts("Maybe i can give u shell ...");
    system("/bin/sh");
  }
  else {
    puts("Hmm, i dont understand you, sorry :)");
  }

  return 0; 
}
