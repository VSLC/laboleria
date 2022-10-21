--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cakes (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    price numeric NOT NULL,
    image character varying(255) NOT NULL,
    description text NOT NULL
);


--
-- Name: cakes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cakes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cakes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cakes_id_seq OWNED BY public.cakes.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(20) NOT NULL
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "cakeId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "totalPrice" numeric NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: cakes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes ALTER COLUMN id SET DEFAULT nextval('public.cakes_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: cakes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cakes VALUES (1, 'bolo de chocolate', 20, 'https://vovopalmirinha.com.br/wp-content/uploads/2016/05/bolo-chocolate-simples-1.jpg', '');
INSERT INTO public.cakes VALUES (2, 'bolo de laranja', 20, 'https://img.itdg.com.br/images/recipes/000/013/953/323851/323851_original.jpg', 'Um bolo muito bom');
INSERT INTO public.cakes VALUES (3, 'bolo de goiaba', 20, 'https://bolosparavender.com.br/wp-content/uploads/2018/06/receita-de-bolo-com-goiabada.jpg', 'Um bolo muito bom');
INSERT INTO public.cakes VALUES (4, 'bolo de cenoura', 20, 'https://conteudo.imguol.com.br/c/entretenimento/54/2022/02/22/bolo-de-cenoura---eu-mereco-1645533548938_v2_1x1.jpg', 'Um bolo muito bom');
INSERT INTO public.cakes VALUES (5, 'bolo de queijo', 30, 'https://img.itdg.com.br/images/recipes/000/156/386/295444/295444_original.jpg', 'Um bolo de queijo');
INSERT INTO public.cakes VALUES (6, 'bolo de cenoura com chocolate', 30, 'https://images.aws.nestle.recipes/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg', 'Um bolo de queijo');
INSERT INTO public.cakes VALUES (7, 'bo', 30, 'https://images.aws.nestle.recipes/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg', 'Um bolo de queijo');
INSERT INTO public.cakes VALUES (8, 'bolo', 0, 'https://images.aws.nestle.recipes/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg', 'Um bolo de queijo');
INSERT INTO public.cakes VALUES (9, 'bolo de cana', 10, 'https://images.aws.nestle.recipes/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg', 'Um bolo de queijo');
INSERT INTO public.cakes VALUES (10, 'bolo de cana com chocolate', 10, 'https://images.aws.nestle.recipes/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg', '');
INSERT INTO public.cakes VALUES (11, 'bolo de cana com chocolate 2', 10, 'https://images.aws.nestle.recipes/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg', 'string');
INSERT INTO public.cakes VALUES (12, 'bolo de cana com chocolate 4', 10, 'https://images.aws.nestle.recipes/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg', 'string');


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES (1, 'Fulana', 'Rua tal', '2199999999');
INSERT INTO public.clients VALUES (2, 'voller', 'visconde de taunay 237', '31975834488');
INSERT INTO public.clients VALUES (3, 'voller', 'visconde de taunay 237', '31975834488');
INSERT INTO public.clients VALUES (4, 'voller', 'visconde de taunay 237', '31975834488');
INSERT INTO public.clients VALUES (5, 'voller', 'visconde de taunay 237', '31975834488');
INSERT INTO public.clients VALUES (6, 'silas', 'visconde de taunay 237', '31975834488');
INSERT INTO public.clients VALUES (7, 'rodrigo', 'Rua antonieta 237', '31975834488');
INSERT INTO public.clients VALUES (8, 'ronaldinho', 'Nova lima', '31975834488');
INSERT INTO public.clients VALUES (9, 'Ronaldinho', 'address', '31975834400');
INSERT INTO public.clients VALUES (10, 'Ronaldinho', 'address', '31975834400');
INSERT INTO public.clients VALUES (11, 'fabio', 'Rua toledo 23', '11222233311');
INSERT INTO public.clients VALUES (12, 'fabio', 'Rua toledo 23', '1122223331');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES (12, 2, 4, 2, '2022-10-21 14:05:00', 40);
INSERT INTO public.orders VALUES (13, 1, 4, 2, '2022-10-21 15:08:00', 40);
INSERT INTO public.orders VALUES (14, 1, 2, 2, '2022-10-21 15:08:00', 40);
INSERT INTO public.orders VALUES (15, 1, 3, 2, '2022-10-21 15:08:00', 40);


--
-- Name: cakes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cakes_id_seq', 12, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 12, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 15, true);


--
-- Name: cakes cakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes
    ADD CONSTRAINT cakes_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: orders orders_cakeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES public.cakes(id);


--
-- Name: orders orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- PostgreSQL database dump complete
--

