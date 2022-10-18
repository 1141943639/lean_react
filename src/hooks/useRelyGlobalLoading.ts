import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppState';
import { changeLoading } from 'store/slice/loading';

export default function useRelyGlobalLoading(relyArr: any[]) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLoading = relyArr.some((loading: any) => Boolean(loading));

    dispatch(changeLoading(isLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, relyArr);
}
