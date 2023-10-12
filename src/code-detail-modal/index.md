# CodeDetailModal

这是代码详情模态框 CodeDetailModal

```jsx
import { CodeDetailModal } from 'x-star-design';
import { Button } from 'antd';
import { useState } from 'react';
export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const codeData1 = {
    problemNameZh: '打印直角三角形',
    problemNameEn: '打印直角三角形',
    detail:
      'compiled successfully\ntime: 72ms, memory: 8536kb, score: 100, status: Accepted\n> test 1: time: 8ms, memory: 8432kb, points: 10, status: Accepted\n> test 2: time: 8ms, memory: 8536kb, points: 10, status: Accepted\n> test 3: time: 8ms, memory: 8488kb, points: 10, status: Accepted\n> test 4: time: 9ms, memory: 8460kb, points: 10, status: Accepted\n> test 5: time: 6ms, memory: 8436kb, points: 10, status: Accepted\n> test 6: time: 8ms, memory: 8428kb, points: 10, status: Accepted\n> test 7: time: 6ms, memory: 8392kb, points: 10, status: Accepted\n> test 8: time: 7ms, memory: 8392kb, points: 10, status: Accepted\n> test 9: time: 5ms, memory: 8464kb, points: 10, status: Accepted\n> test 10: time: 7ms, memory: 8376kb, points: 10, status: Accepted\ntest 1: time: 8ms, memory: 8432kb, points: 10, status: Accepted\n> test 2: time: 8ms, memory: 8536kb, points: 10, status: Accepted\n> test 3: time: 8ms, memory: 8488kb, points: 10, status: Accepted\n> test 4: time: 9ms, memory: 8460kb, points: 10, status: Accepted\n> test 5: time: 6ms, memory: 8436kb, points: 10, status: Accepted\n> test 6: time: 8ms, memory: 8428kb, points: 10, status: Accepted\n> test 7: time: 6ms, memory: 8392kb, points: 10, status: Accepted\n> test 8: time: 7ms, memory: 8392kb, points: 10, status: Accepted\n> test 9: time: 5ms, memory: 8464kb, points: 10, status: Accepted\n> test 10: time: 7ms, memory: 8376kb, points: 10, status: Accepted\n test 1: time: 8ms, memory: 8432kb, points: 10, status: Accepted\n> test 2: time: 8ms, memory: 8536kb, points: 10, status: Accepted\n> test 3: time: 8ms, memory: 8488kb, points: 10, status: Accepted\n> test 4: time: 9ms, memory: 8460kb, points: 10, status: Accepted\n> test 5: time: 6ms, memory: 8436kb, points: 10, status: Accepted\n> test 6: time: 8ms, memory: 8428kb, points: 10, status: Accepted\n> test 7: time: 6ms, memory: 8392kb, points: 10, status: Accepted\n> test 8: time: 7ms, memory: 8392kb, points: 10, status: Accepted\n> test 9: time: 5ms, memory: 8464kb, points: 10, status: Accepted\n> test 10: time: 7ms, memory: 8376kb, points: 10, status: Accepted\n',
    language: 'python3.8',
    status: 'Accepted',
    source:
      'z = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\nz = int(input())\nfor x in range(1, z+1):\n  for y in range(1, x+1):\n    print("*", end = \'\')\n  print("\\n")\n',
    score: 100,
    memory: 8536,
    submissionTime: 1696733459,
  };

  const codeData2 = {
    problemNameZh: '打印直角三角形',
    problemNameEn: '打印直角三角形',
    detail:
      'compiled successfully\ntime: 72ms, memory: 8536kb, score: 100, status: Accepted\n> test 1: time: 8ms, memory: 8432kb, points: 10, status: Accepted\n> test 2: time: 8ms, memory: 8536kb, points: 10, status: Accepted\n> test 3: time: 8ms, memory: 8488kb, points: 10, status: Accepted\n> test 4: time: 9ms, memory: 8460kb, points: 10, status: Accepted\n> test 5: time: 6ms, memory: 8436kb, points: 10, status: Accepted\n> test 6: time: 8ms, memory: 8428kb, points: 10, status: Accepted\n> test 7: time: 6ms, memory: 8392kb, points: 10, status: Accepted\n> test 8: time: 7ms, memory: 8392kb, points: 10, status: Accepted\n> test 9: time: 5ms, memory: 8464kb, points: 10, status: Accepted\n> test 10: time: 7ms, memory: 8376kb, points: 10, status: Accepted\n test 1: time: 8ms, memory: 8432kb, points: 10, status: Accepted\n> test 2: time: 8ms, memory: 8536kb, points: 10, status: Accepted\n> test 3: time: 8ms, memory: 8488kb, points: 10, status: Accepted\n> test 4: time: 9ms, memory: 8460kb, points: 10, status: Accepted\n> test 5: time: 6ms, memory: 8436kb, points: 10, status: Accepted\n> test 6: time: 8ms, memory: 8428kb, points: 10, status: Accepted\n> test 7: time: 6ms, memory: 8392kb, points: 10, status: Accepted\n> test 8: time: 7ms, memory: 8392kb, points: 10, status: Accepted\n> test 9: time: 5ms, memory: 8464kb, points: 10, status: Accepted\n> test 10: time: 7ms, memory: 8376kb, points: 10, status: Accepted\n test 1: time: 8ms, memory: 8432kb, points: 10, status: Accepted\n> test 2: time: 8ms, memory: 8536kb, points: 10, status: Accepted\n> test 3: time: 8ms, memory: 8488kb, points: 10, status: Accepted\n> test 4: time: 9ms, memory: 8460kb, points: 10, status: Accepted\n> test 5: time: 6ms, memory: 8436kb, points: 10, status: Accepted\n> test 6: time: 8ms, memory: 8428kb, points: 10, status: Accepted\n> test 7: time: 6ms, memory: 8392kb, points: 10, status: Accepted\n> test 8: time: 7ms, memory: 8392kb, points: 10, status: Accepted\n> test 9: time: 5ms, memory: 8464kb, points: 10, status: Accepted\n> test 10: time: 7ms, memory: 8376kb, points: 10, status: Accepted\n',
    language: 'plain',
    status: 'Accepted',
    source:
      'https://staticw.turingstar.com.cn/202310091748/620ebc618be695505d78213fe6a74367/70002a9d-3649-4ad4-9590-b5b80d032500',
    score: 100,
    memory: 8536,
    submissionTime: 1696733459,
  };

  return (
    <>
      <Button onClick={() => setOpen1(true)}>{'Click Me!'}</Button>
      <Button onClick={() => setOpen2(true)}>{'Click Me!'}</Button>
      <CodeDetailModal
        open={open1}
        onCancel={() => setOpen1(false)}
        codeData={codeData1}
      />
      <CodeDetailModal
        open={open2}
        onCancel={() => setOpen2(false)}
        codeData={codeData2}
      />
    </>
  );
};
```

## API

<API id="CodeDetailModal"></API>
