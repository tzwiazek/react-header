import { useEffect } from 'react';
import './header.scss';
import { HeaderObcjectInterface } from '../../shared/interfaces/header-object.interface'

export default function Header(): JSX.Element {
  let current: number = 0;
  let prev: number = 0;
  let next: number = 0;

  const headerObject: HeaderObcjectInterface[] = [
    {
      title: "#think.",
      description: ['simplicity', 'mobile', 'opensource']
    },
    {
      title: "create.",
      description: ['responsive', 'engagement', 'brand identity']
    },
    {
      title: "improve.",
      description: ['usability', 'conversions', 'user experience']
    },
  ];

  useEffect(() => {
    document.querySelectorAll('.c-box > .c-box__wrapper').forEach((wrapper: Element) => {
      wrapper.addEventListener('mouseenter', () => {
        wrapper.classList.add('is-active');
        const refreshIntervalId: NodeJS.Timeout = setInterval(() => {
          changeBoxNum(wrapper);
        }, 1000);

        wrapper.addEventListener('mouseleave', () => {
          wrapper.classList.remove('is-active');
          clearInterval(refreshIntervalId);
        }, {once : true});
      })
    });
  });

  function changeBoxNum(wrapper: Element): void {
    let wrapperItems = wrapper.querySelectorAll('.c-box__item');
    wrapperItems.forEach((item: Element, i: number) => {
      if (item.classList.contains('is-active')) {
        current = i + 1;
        if (current === 3) {current = 0;}

        prev = current - 1;
        next = current + 1;

        if (next === 3) {next = 0;}
        if (prev === -1) {prev = 2;}
      }

      item.classList.remove("is-active");
      item.classList.remove("prev");
      item.classList.remove("next");
    });

    wrapperItems[current].classList.add("is-active");
    wrapperItems[prev].classList.add("prev");
    wrapperItems[next].classList.add("next");
  }

  function getCurrentClass(index: number): string {
    if (index === 0) {return 'prev';}
    else if (index === 1) {return 'is-active';}
    else {return 'next'}
  }

  return (
    <div className="c-box">
      {headerObject.map((category: HeaderObcjectInterface, index: number) => (
        <div className="c-box__wrapper" key={index}>
          <span className="c-box__title">{category.title}</span>
          <div className="c-box__container">
            {category.description.map((categoryDescription: string, index: number) => (
              <div
                className={`c-box__item ${getCurrentClass(index)}`}
                key={index}>
                <span>{categoryDescription}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}