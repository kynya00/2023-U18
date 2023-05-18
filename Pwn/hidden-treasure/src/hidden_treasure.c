#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
  setvbuf(stderr, NULL, _IONBF, 0);
  setvbuf(stdout, NULL, _IONBF, 0);

  volatile int chck; 
  char buf[256];

  puts("Welcome to the Hidden Island!");
  puts("[>] Please, tell me secret: ");
  
  chck = 0;
  gets(buf);
  puts("[i] Hmm, let me check secret...");

  if (chck != 0){
    puts("[+] The correct secret has been entered :)");
    puts("Treasure: ");
    system("cat /home/ctfuser/flag.txt");
  }
  else {
    puts("[!] Secret is incorrect :(");
  }

  return 0; 
}
