import pingSvg from '../assets/img/icons/push.svg';
import forwardSvg from '../assets/img/icons/forward.svg';
import commentSvg from '../assets/img/icons/comment.svg';
import likeSvg from '../assets/img/icons/like.svg';
import achieveSvg from '../assets/img/icons/achieve.svg';
import requestSvg from '../assets/img/icons/request.svg';
import suggestSvg from '../assets/img/icons/suggest.svg';

const notificationTypes = [
  { id: 1, type: 'push', icon: pingSvg, text: 'Упомянул тебя в', iconId: 'push' },
  { id: 2, type: 'forward', icon: forwardSvg, text: 'Поделился', iconId: 'forward' },
  { id: 3, type: 'comment', icon: commentSvg, text: 'Оставил комментарий к', iconId: 'comments' },
  { id: 4, type: 'like', icon: likeSvg, text: 'Поставил лайк к', iconId: 'like' },
  { id: 5, type: 'achieve', icon: achieveSvg, text: 'Получено достижение', iconId: 'achieve' },
  {
    id: 6,
    type: 'request',
    icon: requestSvg,
    text: 'Добавил тебя в сообщество',
    iconId: 'request',
  },
  {
    id: 7,
    type: 'suggest',
    icon: suggestSvg,
    text: 'Опубликовал твою',
    iconId: 'suggest',
  },
];

export default notificationTypes;
