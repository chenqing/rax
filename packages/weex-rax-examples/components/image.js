import {createElement, Component, render} from 'rax';
import Panel from '../common/Panel';
import Tip from '../common/Tip';

function ImageItem(props) {
  return (
    <image src={'//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg'} {...props} style={[styles.img, props.style]} />
  );
}

class Example extends Component {
  render() {
    return (
      <scroller>
        <Panel title="width x height" type="primary">
          <Tip type="warning" value="Weex screen width is 750" style={{marginBottom: 20}} />
          <div style={{flexDirection: 'row'}}>
            <ImageItem style={{width: 300, height: 300}} />
            <ImageItem style={{width: 200, height: 200}} />
            <ImageItem style={{width: 50, height: 50}} />
          </div>
        </Panel>
        <Panel title="GIF Animation" type="primary">
          <Tip type="warning" value="Depanding on Native ImageSDK" style={{marginBottom: 20}} />
          <div style={{flexDirection: 'row'}}>
            <ImageItem style={{width: 96, height: 96}} src="https://gtd.alicdn.com/tps/i4/T1HcvHXd4nXXb6ROYh-48-48.gif" />
            <ImageItem style={{width: 68, height: 68, marginLeft: 20}} src="https://gw.alicdn.com/tps/TB1El.mKXXXXXXyapXXXXXXXXXX-34-34.gif" />
          </div>
        </Panel>
        <Panel title="Base64" type="primary">
          <Tip type="warning" value="Depanding on Native ImageSDK" style={{marginBottom: 20}} />
          <div style={{flexDirection: 'row'}}>
            <ImageItem style={{width: 96, height: 96}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO1QTFRFhomSb3J8XGBrdnqDgYWNlJefV1tmfoGKU1diT1NfgISNgoWOYmZwio2Vi4+Wc3eAkJObZGhzUlZiaGt2U1djfYCKZGdyhYiQeHyFio6VgYWOVVllbHB6XWFsY2ZxaWx3jZCYXmFsfYCJcnZ/UVVham54V1tng4aPb3N8WV1pX2JtZWl0YWVvVlpmiYyUWVxohomRd3uEdHiBeX2GZ2t1hIeQVFhkf4OMbnJ8fYGKdnqEb3N9kJScY2dycnaAjpKZdHeBjpKajI+Yc3eBhYiRf4KLXmFtio6Wi4+XjZCZkJSbkZScjI+XlJifTlJe+rAZcwAAAZBJREFUeNp0lOeWgjAQhSdUBQRRbFjX7tpW3XUt23tL3v9xNigJIHh/zRk+5iR3ZgIkULWmwgv+A7VWDWWBR/nSt2gLUzIVbLH1lo8RRW1wEfqxPtCKUaKTMUhURuUhTIi6Q07l6LuAEFdpEld6tWNEx00CKKJ3jsR1xSHJcj4bB+LmkpxT49Yj8mqQUVBBciUk8ITepESJ+5AqY1+uwny5IjDPcADoN0BIwjLOsjKZOewtbi/9fvi338a44CetIai2H/cokPLj9tfEj2wVzD4rIWMlfpu+CXc5Pw4qh5X7AUw4gZIswUENGT8lAN1fMBVeAxIIxYR3Nin0imOe52emdxkyP8aY+0S9Y2d63cNoxvACRTaeI70slst+cjYCAnXmuuS1RKKmy1hKBX0hzaC3KOsxsmz2Ir2NzMcEbVCo+cf5oDOWOzNAucpxxoglnZlT1+KzXk4kymKwL4ttN+73dhHeuWV85zLL073Vw3v7MdDuE3a/JRrCmqwFQ2yV8gmvg/d+aPCMH0GLvB//AgwAo1MTpxsaxVoAAAAASUVORK5CYII=" />
            <ImageItem style={{width: 68, height: 68, marginLeft: 20}} src="data:image/gif;base64,R0lGODlhIgAiANU7AMvLy83Nzdra2srKysnJyejo6MbGxtzc3M7Ozuzs7NTU1N3d3fz8/NfX1/j4+Ovr6+/v79DQ0Obm5v39/d/f3/f398/Pz9vb2+np6fn5+f7+/tXV1fX19dnZ2erq6tHR0fb29sjIyMfHx+Li4vLy8u7u7ufn5/r6+uPj49bW1tPT09LS0sTExPT09ODg4O3t7eHh4eTk5MXFxd7e3vHx8fPz8/Dw8OXl5djY2P///8zMzP///wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0Q0QxODlDNENEOEQxMUUzOEIzM0I1ODVGNjU1MjBBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0Q0QxODlDNUNEOEQxMUUzOEIzM0I1ODVGNjU1MjBBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRDRDE4OUMyQ0Q4RDExRTM4QjMzQjU4NUY2NTUyMEFCIiBzdFJl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" />
          </div>
        </Panel>
        <Panel title="resize" type="primary">
          <Panel title="resize=stretch(default) 600 x 200 ">
            <ImageItem style={{ width: 600, height: 200, borderStyle: 'solid', borderWidth: 1, borderColor: '#333333' }} resize="stretch" />
          </Panel>
          <Panel title="resize=contain 600 x 200 ">
            <ImageItem style={{ width: 600, height: 200, borderStyle: 'solid', borderWidth: 1, borderColor: '#333333' }} resize="contain" />
          </Panel>
          <Panel title="resize=cover 600 x 200">
            <ImageItem style={{ width: 600, height: 200, borderStyle: 'solid', borderWidth: 1, borderColor: '#333333' }} resize="cover" />
          </Panel>
        </Panel>
      </scroller>
    );
  }
}

const styles = {
  img: {
    marginBottom: 20
  }
};

render(<Example />);
