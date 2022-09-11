import styled from 'styled-components';

const MainDiv = styled.div`
  /* background-color: #efedef; */
  width: 96%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  gap: 30px;
`;

const Layout = props => {
  return <MainDiv>{props.children}</MainDiv>;
};

export default Layout;
