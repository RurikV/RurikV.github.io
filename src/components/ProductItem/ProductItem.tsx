import React from 'react';
import { styled } from 'styled-components';
import { Product } from '../../homeworks/ts1/3_write';

export interface ProductItemProps {
  product: Product;
  className?: string;
  onClick?: () => void;
}

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colorBorder};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.colorBgPrimary};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ProductName = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 18px;
  font-weight: 600;
`;

const ProductPrices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ProductPrice = styled.span`
  color: ${(props) => props.theme.colorPrimary};
  font-size: 18px;
  font-weight: 700;
`;

const ProductOldPrice = styled.span`
  color: ${(props) => props.theme.colorTextSecondary};
  font-size: 14px;
  text-decoration: line-through;
  margin-bottom: 4px;
`;

const ProductDescription = styled.p`
  color: ${(props) => props.theme.colorTextSecondary};
  font-size: 14px;
  line-height: 1.4;
  margin: 8px 0;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${(props) => props.theme.colorBorder};
`;

const ProductCategory = styled.span`
  background-color: ${(props) => props.theme.colorPrimary};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const ProductDate = styled.span`
  color: ${(props) => props.theme.colorTextSecondary};
  font-size: 12px;
`;

export const ProductItem: React.FC<ProductItemProps> = ({ product, className, onClick }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <ProductItemContainer className={className} onClick={onClick}>
      <ProductImage src={product.photo} alt={product.name} />

      <ProductHeader>
        <ProductName>{product.name}</ProductName>
        <ProductPrices>
          {product.oldPrice && <ProductOldPrice>${product.oldPrice}</ProductOldPrice>}
          <ProductPrice>${product.price}</ProductPrice>
        </ProductPrices>
      </ProductHeader>

      {product.desc && <ProductDescription>{product.desc}</ProductDescription>}

      <ProductMeta>
        <ProductCategory>{product.category.name}</ProductCategory>
        <ProductDate>{formatDate(product.createdAt)}</ProductDate>
      </ProductMeta>
    </ProductItemContainer>
  );
};