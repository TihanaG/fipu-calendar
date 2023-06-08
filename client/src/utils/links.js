import { FaCalendarAlt } from 'react-icons/fa';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';

const links = [
    {
        id: 1,
        text: 'Calendar',
        path: '/',
        icon: <FaCalendarAlt />,
    },
    {
        id: 2,
        text: 'reports',
        path: 'reports',
        icon: <IoBarChartSharp />,
    },
    {
        id: 3,
        text: 'profile',
        path: 'profile',
        icon: <MdManageAccounts />,
    },
];

export default links;