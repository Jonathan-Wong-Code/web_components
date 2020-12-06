import { createPortal } from 'react-dom';

interface IPortal {
  children: React.ReactElement;
  portalId: string;
}

const Portal = ({ children, portalId }: IPortal): JSX.Element => {
  const existingPortalDiv = document.getElementById(portalId);
  
  if (existingPortalDiv) {
    return createPortal(children, existingPortalDiv as HTMLDivElement);
  }

  const portalDiv = document.createElement('div');
  portalDiv.setAttribute('id', portalId);
  document.body.append(portalDiv);

  return createPortal(children, portalDiv);
};

export default Portal;