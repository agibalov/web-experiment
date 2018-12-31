#include <stdio.h>

struct Calculator {
  Calculator() {
    printf("Calculator initialized\n");
  }

  int add(int a, int b) {
    return a + b;
  }
};

Calculator calculator;

extern "C" {
  int main() {
    for(int i = 0; i < 10; ++i) {
      printf("hello world! %d\n", i);
    }
    return 0;
  }

  int addNumbers(int a, int b) {
    int result = calculator.add(a, b);
    printf("someone is adding %d and %d (and result is %d) (using calculator %p)\n", a, b, result, &calculator);
    return result;
  }

  void makeGreeting(char* name, char* greeting) {
    sprintf(greeting, "hi %s!!!", name);
    printf("generated the greeting: %s\n", greeting);
  }
}
