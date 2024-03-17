import MadeBySweets from '../MadeBySweets';
import SearchInput from '../SearchInput';
import LandingPageHeader from './LandingPageHeader';

const LandingPageContent = () => (
  <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 md:px-6">
    <LandingPageHeader />
    <SearchInput />
    <MadeBySweets />
  </div>
);

export default LandingPageContent;
