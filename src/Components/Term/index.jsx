// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)
  occurrences = Array(26).fill(0);

  for (var i = 0; i < S.length; i++) {
    const index = S.charAt(i).charCodeAt(0) - 97;
    occurrences[index] += 1;
  }
  occurrences.sort((a, b) => b - a);

  deleteCount = 0;
  for (var i = 0; i < 25; i++) {
    if (occurrences[i] == 0) break;
    if (occurrences[i] == occurrences[i + 1]) {
      duplicate = i + 1;
      while (duplicate < 26 && occurrences[i] == occurrences[duplicate]) {
        occurrences[duplicate] -= 1;
        deleteCount += 1;
        duplicate += 1;
      }
    }
  }
  return deleteCount;
}
