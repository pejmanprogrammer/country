import Header from '@/components/layout/Header';
import PageContainer from '@/components/layout/PageContainer';
import CountryList from '@/features/countries/components/CountryList';

export default function HomePage() {
  return (
    <>
      <Header />

      <PageContainer>
        <CountryList />
      </PageContainer>
    </>
  );
}