import { useUI } from '../context/UIContext';

export default function Toast() {
  const { toastMsg, toastOn } = useUI();
  return <div className={'toast' + (toastOn ? ' on' : '')}>{toastMsg}</div>;
}
