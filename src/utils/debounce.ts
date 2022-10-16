function debounce(func: Function, duration: number) {
  let timeout: number | undefined;

  return function (...args: any[]) {
    const effect = () => {
      timeout = undefined;
      return func(...args);
    }
    clearTimeout(timeout)
    timeout = setTimeout(effect, duration) as any;
  }
}

export default debounce;
