const formatTime = (time: number) => new Date(time * 1000).toISOString().slice(14, 19);
export default formatTime;
