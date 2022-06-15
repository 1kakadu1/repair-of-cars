import type { NextPage } from 'next'
import Head from 'next/head'
import { Box } from '../../client/components/box/box.component';
import { Breadcrumbs } from '../../client/components/breadcrumbs/breadcrumbs.component';
import { Container } from '../../client/components/container/container.component';
import { Footer } from '../../client/components/footer/footer';
import { Header } from '../../client/components/header/header.component';
import { wrapper } from '../../client/store/state';
import { useContext } from 'react';
import NotificationContext from '../../client/components/notification-bar/notification-bar.context';
import { Loader } from '../../client/components/loader/loader.component';
import cl from "./product.module.scss";

const Product: NextPage = () => {
  const { updateNotification } = useContext(NotificationContext);

  return (
    <div>
      <Head>
        <title>Список всех видов шин</title>
        <meta name="description" content="Лучший сервис по работе с авто" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container>
        <Box styles={{paddingTop: "20px"}}/>
        <Breadcrumbs 
          links={[
            {
              name: "Продукты"
            }
          ]}
        />
        <div className={cl.page}>


        </div>
        <Loader loading={false} />
      </Container>




      <Footer />
    </div>
    )
}

Product.getInitialProps = wrapper.getInitialPageProps(store => async (context) => {
    const {query} = context;

});

export default Product
