# CodeDetailModal

这是代码详情模态框 CodeDetailModal

```jsx
import { CodeDetailModal } from 'x-star-design';
import { Button } from 'antd';
import { useState } from 'react';
export default () => {
  const [open, setOpen] = useState(false);
  const codeData = {
    problemNameZh: '这是一个题目名称',
    problemNameEn: 'This is a problem name',
    source: `#include<bits/stdc++.h>
using namespace std;
int main(){
	int m;
	double ans;
	cin>>m;
	if(m<=30){
		ans=m*0.2;
	}else if(m<=60){
		ans=6+(m-30)*0.6;
	}else{
		cout<<"NO";
		return 0;
	}printf("%.2lf",ans);
	return 0;
}`,
    language: 'g++11',
    status: 'Accepted',
    score: 100,
    memory: 102,
    submissionTime: 1696641138,
    detail: `compiled successfully
time: 5ms, memory: 3708kb, score: 100, status: Accepted
> test 1: time: 1ms, memory: 3548kb, points: 10, status: Accepted
> test 2: time: 0ms, memory: 3484kb, points: 10, status: Accepted
> test 3: time: 1ms, memory: 3680kb, points: 10, status: Accepted
> test 4: time: 0ms, memory: 3680kb, points: 10, status: Accepted
> test 5: time: 1ms, memory: 3540kb, points: 10, status: Accepted
> test 6: time: 0ms, memory: 3556kb, points: 10, status: Accepted
> test 7: time: 1ms, memory: 3680kb, points: 10, status: Accepted
> test 8: time: 1ms, memory: 3708kb, points: 10, status: Accepted
> test 9: time: 0ms, memory: 3648kb, points: 10, status: Accepted
> test 10: time: 0ms, memory: 3624kb, points: 10, status: Accepted`,
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>{'Click Me!'}</Button>
      <CodeDetailModal
        open={open}
        onCancel={() => setOpen(false)}
        codeData={codeData}
      />
    </>
  );
};
```

## API

<API id="CodeDetailModal"></API>
