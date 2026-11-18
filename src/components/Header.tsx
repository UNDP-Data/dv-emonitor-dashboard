import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuDropdown,
  HeaderMenuLink,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';

export default function HeaderEl() {
  const projectCards = [
    {
      title: 'UNDP Defenders Project',
      id: 'defenders',
    },
  ];
  return (
    <Header>
      <HeaderLogoUnit hyperlink='/' siteName='eMonitor +' />
      <HeaderMainNavUnit>
        <HeaderMenuUnit>
          <HeaderMenuLink href='/'>Home</HeaderMenuLink>
          <HeaderMenuDropdown
            label='Projects'
            items={projectCards.map((project) => ({
              label: project.title,
              href: `/projects/${project.id}`,
            }))}
          />
          <HeaderMenuLink href='/resources'>Resources</HeaderMenuLink>
          <HeaderMenuLink href='/about'>About</HeaderMenuLink>
        </HeaderMenuUnit>
      </HeaderMainNavUnit>
    </Header>
  );
}
