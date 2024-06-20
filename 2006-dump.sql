--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 16.2

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
-- Name: case; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."case" (
    id integer NOT NULL,
    description character varying,
    article character varying,
    issue character varying,
    "userId" integer,
    number character varying
);


ALTER TABLE public."case" OWNER TO postgres;

--
-- Name: case_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.case_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.case_id_seq OWNER TO postgres;

--
-- Name: case_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.case_id_seq OWNED BY public."case".id;


--
-- Name: discount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discount (
    id integer NOT NULL,
    type character varying NOT NULL,
    description character varying NOT NULL,
    discount_percentage integer NOT NULL,
    "userId" integer
);


ALTER TABLE public.discount OWNER TO postgres;

--
-- Name: discount_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discount_id_seq OWNER TO postgres;

--
-- Name: discount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discount_id_seq OWNED BY public.discount.id;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    id integer NOT NULL,
    rating integer NOT NULL,
    description character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedback_id_seq OWNER TO postgres;

--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    id integer NOT NULL,
    name character varying,
    short_name character varying,
    address character varying,
    inn character varying,
    contacts character varying,
    photo character varying
);


ALTER TABLE public.organization OWNER TO postgres;

--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organization_id_seq OWNER TO postgres;

--
-- Name: organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organization_id_seq OWNED BY public.organization.id;


--
-- Name: portfolio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portfolio (
    id integer NOT NULL,
    education character varying NOT NULL,
    length_of_service integer NOT NULL,
    retraining character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.portfolio OWNER TO postgres;

--
-- Name: portfolio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.portfolio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portfolio_id_seq OWNER TO postgres;

--
-- Name: portfolio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.portfolio_id_seq OWNED BY public.portfolio.id;


--
-- Name: request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request (
    id integer NOT NULL,
    status character varying NOT NULL,
    description character varying,
    suggested_price character varying,
    date_meeting timestamp without time zone,
    suggested_date_meeting timestamp without time zone,
    "lawyerId" integer,
    "userId" integer,
    "typeRightId" integer,
    trouble_type character varying,
    active boolean,
    additional_inf character varying,
    "proposedLawyerId" integer
);


ALTER TABLE public.request OWNER TO postgres;

--
-- Name: COLUMN request.suggested_date_meeting; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.request.suggested_date_meeting IS 'Предлагаемая дата консультации (указывает клиент)';


--
-- Name: request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.request_id_seq OWNER TO postgres;

--
-- Name: request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.request_id_seq OWNED BY public.request.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    value character varying,
    description character varying
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: type_right; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_right (
    id integer NOT NULL,
    name character varying,
    description character varying,
    icon character varying,
    type_trouble jsonb
);


ALTER TABLE public.type_right OWNER TO postgres;

--
-- Name: type_right_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_right_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.type_right_id_seq OWNER TO postgres;

--
-- Name: type_right_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_right_id_seq OWNED BY public.type_right.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    middle_name character varying,
    login character varying,
    password character varying,
    phonenumber character varying,
    photo character varying,
    date_of_birth timestamp without time zone,
    contact_email character varying,
    "organizationId" integer,
    "roleId" integer,
    type_law jsonb,
    education character varying,
    work_experience character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: case id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."case" ALTER COLUMN id SET DEFAULT nextval('public.case_id_seq'::regclass);


--
-- Name: discount id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount ALTER COLUMN id SET DEFAULT nextval('public.discount_id_seq'::regclass);


--
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organization_id_seq'::regclass);


--
-- Name: portfolio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio ALTER COLUMN id SET DEFAULT nextval('public.portfolio_id_seq'::regclass);


--
-- Name: request id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request ALTER COLUMN id SET DEFAULT nextval('public.request_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: type_right id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_right ALTER COLUMN id SET DEFAULT nextval('public.type_right_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: case; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."case" (id, description, article, issue, "userId", number) FROM stdin;
5	Представляя интересы юридического лица, допустившего административное правонарушение, предусмотренное составом статьи 8.35 Кодекса РФ об административных правонарушениях, в ходе дела представлялись объяснения и возражения относительно требований природоохранного прокурора о привлечении юридического лица к административной ответственности, санкция в рамках которой предусматривает штраф до 1 млн. руб. 	Статья 152	назначено наказание в виде административного штрафа в размере ниже низшего предела штрафа, предусмотренного статьей 8.35 КоАП РФ, а именно в сумме 250 тыс. руб.\n	16	3-067-2022 от 02.03.2022 г.
8	Представляя конкурсного управляющего организации-банкрота, в суд заявлены требования о признании недействительными сделок, совершенных между банкротом и родственником руководителя организациибанкрота, и о взыскании денежных средств 	Статья 152	Заявленные требования удовлетворены в полном объѐме. Оспариваемые сделки признаны недействительными, с ответчика взысканы денежные средства в размере 1,7 млн. руб	16	А70-10815/2018
2	Защищая интересы гражданина, попавшего в обманную схему по завладению чужими деньгами, заявлены требования о взыскании с группы граждан денежных средств, неосновательно полученных в счёт предполагаемой покупки жилья	Статья 152	В пользу гражданина взыскана сумма неосновательного обогащения в размере 2 млн. руб. Подробнее о деле писал здесь: https://vk.com/urist_tumen?w=wall-183785786_45.	16	А73-18940/2022
4	Представляя интересы гражданки, заявлены требования о включении объекта недвижимости (гараж в\nкапитальном гаражном комплексе), оставшегося после смерти супруга, в состав наследственного имущества и признании\nправа собственности на это имущество. При этом ранее права умершего в госреестре зарегистрированы не были.	Статья 152	Требования удовлетворены в полном объѐме, за гражданкой и ее ребенком признано право собственности на объект недвижимости.\n	16	2-802/2022
6	Представляя интересы организации-конкурсного кредитора в рамках дела о банкротстве организацииконтрагента, реализована защита интересов доверителя в рамках производства по заявлению другого конкурсного кредитора об оспаривании сделки (договора поставки товаров) с суммой долга должника перед доверителем в размере 43,5 млн руб. и применении последствий в виде удовлетворения требований организации-доверителя после удовлетворения требований кредиторов третьей очереди, включенных в реестр требований кредиторов.	Статья 152	В удовлетворении заявления о признании сделки недействительной отказано, защищены требования доверителя, включенные в реестр требований должника, на сумму 43,5 млн. руб.\n	16	 А70-10755/2015
3	Защита интересов организации-доверителя в рамках дела о банкротстве организации-контрагента при рассмотрении требований конкурсного кредитора об оспаривании сделки, заключенной между банком и организациейдоверителем, по уступке прав (требований) к должнику на сумму 149,9 млн. руб., применении последствий недействительности сделки в виде удовлетворения требований доверителя после удовлетворения требований кредиторов третьей очереди, включѐнных в реестр требований кредиторов.	Статья 152	В удовлетворении требований об оспаривании сделки отказано, защищены требования доверителя, включѐнные в реестр требований должника, на сумму 149,9 млн. руб. 	16	А70-10755/2015
1	Представляя интересы компании-покупателя в рамках сделки по поставке двигателя внутреннего сгорания, в суд заявлены исковые требования о взыскании с продавца суммы внесѐнной предоплаты и финансовых санкций в виду неисполнения продавцом своих обязательств в полном объѐме. \n	Статья 152	Требования удовлетворены. С ответчика в пользу доверителя взыскана сумма предоплаты в размере 165 000 руб., проценты 12 601,02 руб., а также проценты по день фактической оплаты долга.	16	2-1400/2021
9	Представляя интересы организации, оплатившей стройматериалы, но не получившей их, подан иск о взыскании с поставщика, не исполнившего обязательства по сделке поставки, суммы внесенной предоплаты и суммы финансовых санкций.	Статья 152	Исковые требования удовлетворены в полном объеме	16	А60-10444/2022
7	Представляя конкурсного управляющего в деле о банкротстве организации (спортивный клуб), в суд заявлены требования о признании бездействия предыдущего арбитражного управляющего организации-должника несоответствующим закону и о взыскании убытков. 	Статья 152	Требования удовлетворены, действия (бездействие) предыдущего конкурсного управляющего организации-должника признаны несоответствующими закону, взысканы убытки в конкурсную массу на сумму 1 142 200 руб	16	А75-12444/2015\r
37	\N	fasfasf	asfafaasffasaf	16	undefined
38	Просьба признать факт нарушения ее личных неимущественных и исключительных прав при публикации и распространении учебного пособия под названием "Комягин Д.Л. Схемы по бюджетному праву: учебное пособие" (ISBN 978-5-8114-3125-0) (далее - Учебное пособие), признать тираж данного пособия контрафактным, возложить на ООО "Издательство Лань", ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "ЭБС ЛАНЬ", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Л-Цифра", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" обязанность пресечь воспроизведение, распространение и доведение Учебного пособия до всеобщего сведения путем изъятия его в напечатанном и электронном виде из гражданского оборота, уничтожения без компенсации, запрета указанным выше юридическим лицам повторно издавать, допечатывать, опубликовывать в электронном виде, распространять в информационно-телекоммуникационной сети "Интернет" и электронных базах данных, взыскать с Комягина Д.Л. компенсацию морального вреда в размере 100 000 руб. и компенсацию за нарушение исключительных прав - 150 000 руб., а также взыскать компенсацию за нарушение исключительных прав с ООО "Издательство Лань" - 52 768 руб., с ООО "ЭБС ЛАНЬ" и ООО "Л-Цифра" - по 20 000 руб., с ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" - по 10 000 руб., а также взыскать с ответчиков судебные расходы.			16	14
39	Просьба признать факт нарушения ее личных неимущественных и исключительных прав при публикации и распространении учебного пособия под названием "Комягин Д.Л. Схемы по бюджетному праву: учебное пособие" (ISBN 978-5-8114-3125-0) (далее - Учебное пособие), признать тираж данного пособия контрафактным, возложить на ООО "Издательство Лань", ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "ЭБС ЛАНЬ", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Л-Цифра", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" обязанность пресечь воспроизведение, распространение и доведение Учебного пособия до всеобщего сведения путем изъятия его в напечатанном и электронном виде из гражданского оборота, уничтожения без компенсации, запрета указанным выше юридическим лицам повторно издавать, допечатывать, опубликовывать в электронном виде, распространять в информационно-телекоммуникационной сети "Интернет" и электронных базах данных, взыскать с Комягина Д.Л. компенсацию морального вреда в размере 100 000 руб. и компенсацию за нарушение исключительных прав - 150 000 руб., а также взыскать компенсацию за нарушение исключительных прав с ООО "Издательство Лань" - 52 768 руб., с ООО "ЭБС ЛАНЬ" и ООО "Л-Цифра" - по 20 000 руб., с ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" - по 10 000 руб., а также взыскать с ответчиков судебные расходы.	12344	решение решение 	16	14
40	Просьба признать факт нарушения ее личных неимущественных и исключительных прав при публикации и распространении учебного пособия под названием "Комягин Д.Л. Схемы по бюджетному праву: учебное пособие" (ISBN 978-5-8114-3125-0) (далее - Учебное пособие), признать тираж данного пособия контрафактным, возложить на ООО "Издательство Лань", ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "ЭБС ЛАНЬ", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Л-Цифра", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" обязанность пресечь воспроизведение, распространение и доведение Учебного пособия до всеобщего сведения путем изъятия его в напечатанном и электронном виде из гражданского оборота, уничтожения без компенсации, запрета указанным выше юридическим лицам повторно издавать, допечатывать, опубликовывать в электронном виде, распространять в информационно-телекоммуникационной сети "Интернет" и электронных базах данных, взыскать с Комягина Д.Л. компенсацию морального вреда в размере 100 000 руб. и компенсацию за нарушение исключительных прав - 150 000 руб., а также взыскать компенсацию за нарушение исключительных прав с ООО "Издательство Лань" - 52 768 руб., с ООО "ЭБС ЛАНЬ" и ООО "Л-Цифра" - по 20 000 руб., с ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" - по 10 000 руб., а также взыскать с ответчиков судебные расходы.	fasfaf	afsafa	16	14
\.


--
-- Data for Name: discount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discount (id, type, description, discount_percentage, "userId") FROM stdin;
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedback (id, rating, description, "userId") FROM stdin;
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization (id, name, short_name, address, inn, contacts, photo) FROM stdin;
3	Юридическая Практика \\"Право и Ордер\\" Ltd.	ЮрПракт \\"ПиО\\"	ул. Юридическая, 101, Нью-Йорк, NY 10001	4321098765	info@globallaw.com, +1 (212) 123-4567	https://map-nn.ru/wp-content/uploads/2022/08/fin.png
4	Юридическая Клиника \\"Правовой Защиты\\"	ЮрКлиника \\"ПЗ\\"	ул. Юридическая, 202, Берлин, Германия 10115	9012345678	info@legalprotection.de, +49 (30) 12345678	https://gk-ooo.ru/wp-content/uploads/2021/10/yur-adres-krasnoyarskaya-ul-d-17-1.jpg
2	Адвокатская Контора "Закон и Справедливость"	АК \\"ЗиС\\"	ул. Законная, 456, Санкт-Петербург, Россия 191186	9876543210	info@lawandjustice.com, +7 (812) 987-65-43	https://avatars.mds.yandex.net/get-altay/1881820/2a0000016a44f0c61a41c3c0762cf9ac595e/orig
1	Юридическая Консультация и Сервисы ООО	ЮрКонсСерв	ул. Технологическая, 123, Силикон-Вэли, CA 94015	 1234567890	info@legalconsult.com, +7 (495) 123-45-67	https://bogatyr.club/uploads/posts/2023-06/1687966752_bogatyr-club-p-kabinet-sekretarya-foni-instagram-47.jpg
6	Липецкое Эксперто Оценочной Бюро	ЛЭОБ	ул. Советская, вл. 36, оф. 112	9014215678	leob@mail.ru	https://yandex-images.clstorage.net/d4q7Lh233/081c91uRJ0/8WMLUNqbsAzMUh7hQxj7V0BXksIK4CDRE-g-kiH0tVhs6b_yddQ77uNdaDeAH31ZCQIyo8YSRttICTviUrBSY-UhUxzGy6JfigNVoF5N-kYPGtz0NskHoDzMCOIJw4gyRMuy8mKfaqb1HyhZ6BAndEhWV-qVaCCZdjRx5wSzJVDqRGUso6izI9BJCugGOvpMHXyl7gfACqotyiPuCdiTBk_phNRnv3Wxmi8ScMVYPGloZEjbuGkplm0JT_kNgCd6zmhUNKGDkwTyQir5KS_5QAJIoME3zR64HNktzCL3hgBU5q_Xe49bl740PH70fCZIQFpEybVVGr9JPlzoIJwQasBbYRe2vZYe0XUL8BQ47GULY6ngHcc7mDDmIt8-_pcCYeyf0mO8Zam4NChg3HEMVUpRatSPZDaCXiRF-hW5I2jAd1I-pLmDI89WPvc_LfttAWinxT7LF5IW1wjlIMOoE3zBjPFZq0GYogQ6duFzGU9DRHHHmFkdj10YWuYBtxB4yWdCKZ6RsAHtUCDzNxjxSBl2luMXyBCrDfwz6STasxpoxpzyQZZekY4vHlLRQyNpQHRQ57JGHYpVCHHsEb8UUe9oVw2_mYwB6Fgp3QU97HQEepHGGNUStw3-BPoT4KwgeeKD9kqYaYasADxq-0IrcGpLbfSMWjCgQBxmzjGmKXHCVl88jL6VDPZaGMccNM98IliK9AjsLbwxxAvnF8GXM3rUisV5vn-xmioFRPxkHnNeYUTYmnAcimAabMwppS5L4nxhGbSWqA79fCTDPyPSdDt4uss3yDmoH-Iy0xPhhgdm8aL5daFZhpwgCUTQdCJXfmRn_4FIBatgG3nsAKUlevNEWhi6iKwh6VsN8QoM9XQDWr_DJu0wiT7gH_8W-K0ceMuP63uYd52oPjtC718AYHx7VOK0Thu1fi9l0wubJ2nSc3czvYyuHelcA_Y-AchvAUeb1RfiP50J_i32CuE
5	ридическая Консультация \\"Глобальный Закон\\" LLC	ЮрКонс \\"ГЗ\\"	ул. Юридическая, 202, Берлин, Германия 10115	9012345678	info@legalprotection.de, +49 (30) 12345678	https://janhendrix.com.mx/2016/wp-content/uploads/2016/07/HS_PROY_AFRICAH_01.jpg
8	ЛипецкЮрист	ЛЮ	г. Липецк, ул. Стаханова, д. 57	123344142	89005964776	https://gk-ooo.ru/wp-content/uploads/2021/10/yur-adres-sedova-ul-d-2-k-1-1.jpg
\.


--
-- Data for Name: portfolio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.portfolio (id, education, length_of_service, retraining, "userId") FROM stdin;
\.


--
-- Data for Name: request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request (id, status, description, suggested_price, date_meeting, suggested_date_meeting, "lawyerId", "userId", "typeRightId", trouble_type, active, additional_inf, "proposedLawyerId") FROM stdin;
15	done	Просьба признать факт нарушения ее личных неимущественных и исключительных прав при публикации и распространении учебного пособия под названием "Комягин Д.Л. Схемы по бюджетному праву: учебное пособие" (ISBN 978-5-8114-3125-0) (далее - Учебное пособие), признать тираж данного пособия контрафактным, возложить на ООО "Издательство Лань", ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "ЭБС ЛАНЬ", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Л-Цифра", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" обязанность пресечь воспроизведение, распространение и доведение Учебного пособия до всеобщего сведения путем изъятия его в напечатанном и электронном виде из гражданского оборота, уничтожения без компенсации, запрета указанным выше юридическим лицам повторно издавать, допечатывать, опубликовывать в электронном виде, распространять в информационно-телекоммуникационной сети "Интернет" и электронных базах данных, взыскать с Комягина Д.Л. компенсацию морального вреда в размере 100 000 руб. и компенсацию за нарушение исключительных прав - 150 000 руб., а также взыскать компенсацию за нарушение исключительных прав с ООО "Издательство Лань" - 52 768 руб., с ООО "ЭБС ЛАНЬ" и ООО "Л-Цифра" - по 20 000 руб., с ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" - по 10 000 руб., а также взыскать с ответчиков судебные расходы.	\N	2024-06-19 12:00:00	\N	16	33	7	Другое	f	\N	0
17	accepted	Просьба признать факт нарушения ее личных неимущественных и исключительных прав при публикации и распространении учебного пособия под названием "Комягин Д.Л. Схемы по бюджетному праву: учебное пособие" (ISBN 978-5-8114-3125-0) (далее - Учебное пособие), признать тираж данного пособия контрафактным, возложить на ООО "Издательство Лань", ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "ЭБС ЛАНЬ", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Л-Цифра", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" обязанность пресечь воспроизведение, распространение и доведение Учебного пособия до всеобщего сведения путем изъятия его в напечатанном и электронном виде из гражданского оборота, уничтожения без компенсации, запрета указанным выше юридическим лицам повторно издавать, допечатывать, опубликовывать в электронном виде, распространять в информационно-телекоммуникационной сети "Интернет" и электронных базах данных, взыскать с Комягина Д.Л. компенсацию морального вреда в размере 100 000 руб. и компенсацию за нарушение исключительных прав - 150 000 руб., а также взыскать компенсацию за нарушение исключительных прав с ООО "Издательство Лань" - 52 768 руб., с ООО "ЭБС ЛАНЬ" и ООО "Л-Цифра" - по 20 000 руб., с ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" - по 10 000 руб., а также взыскать с ответчиков судебные расходы.	\N	\N	2024-06-19 18:00:00	16	18	8	Право колхоза бесплатно и бессрочно пользоваться землей	t	\N	0
11	pending	Просьба признать факт нарушения ее личных неимущественных и исключительных прав при публикации и распространении учебного пособия под названием "Комягин Д.Л. Схемы по бюджетному праву: учебное пособие" (ISBN 978-5-8114-3125-0) (далее - Учебное пособие), признать тираж данного пособия контрафактным, возложить на ООО "Издательство Лань", ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "ЭБС ЛАНЬ", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Л-Цифра", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" обязанность пресечь воспроизведение, распространение и доведение Учебного пособия до всеобщего сведения путем изъятия его в напечатанном и электронном виде из гражданского оборота, уничтожения без компенсации, запрета указанным выше юридическим лицам повторно издавать, допечатывать, опубликовывать в электронном виде, распространять в информационно-телекоммуникационной сети "Интернет" и электронных базах данных, взыскать с Комягина Д.Л. компенсацию морального вреда в размере 100 000 руб. и компенсацию за нарушение исключительных прав - 150 000 руб., а также взыскать компенсацию за нарушение исключительных прав с ООО "Издательство Лань" - 52 768 руб., с ООО "ЭБС ЛАНЬ" и ООО "Л-Цифра" - по 20 000 руб., с ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" - по 10 000 руб., а также взыскать с ответчиков судебные расходы.	\N	\N	\N	\N	16	7	Защита личных неимущественных прав	f	\N	\N
20	accepted	Клиент, разработчик программного обеспечения, обнаружил, что его проприетарный программный код был скопирован и использован без разрешения конкурирующей компанией. Клиент требует признать факт несанкционированного использования его кода, объявить программное обеспечение конкурента производным произведением и потребовать, чтобы конкурент прекратил производство, распространение контрафактного программного обеспечения. Клиент требует возмещения морального вреда в размере 80 000 рублей и компенсации за нарушение исключительных прав в размере 150 000 рублей. Судебные издержки также подлежат взысканию.	\N	2024-06-22 18:00:00	\N	16	28	8	Защита личных неимущественных прав	t	\N	0
14	done	Просьба признать факт нарушения ее личных неимущественных и исключительных прав при публикации и распространении учебного пособия под названием "Комягин Д.Л. Схемы по бюджетному праву: учебное пособие" (ISBN 978-5-8114-3125-0) (далее - Учебное пособие), признать тираж данного пособия контрафактным, возложить на ООО "Издательство Лань", ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "ЭБС ЛАНЬ", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Л-Цифра", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" обязанность пресечь воспроизведение, распространение и доведение Учебного пособия до всеобщего сведения путем изъятия его в напечатанном и электронном виде из гражданского оборота, уничтожения без компенсации, запрета указанным выше юридическим лицам повторно издавать, допечатывать, опубликовывать в электронном виде, распространять в информационно-телекоммуникационной сети "Интернет" и электронных базах данных, взыскать с Комягина Д.Л. компенсацию морального вреда в размере 100 000 руб. и компенсацию за нарушение исключительных прав - 150 000 руб., а также взыскать компенсацию за нарушение исключительных прав с ООО "Издательство Лань" - 52 768 руб., с ООО "ЭБС ЛАНЬ" и ООО "Л-Цифра" - по 20 000 руб., с ООО "НАУКУ-ВСЕМ", ООО "Лань-Трейд", ООО "Новый Книжный Центр", ООО "Глобус-Пресс XXI", ООО "Лабиринт.РУ", ООО "Торговый дом "БИБЛИО-ГЛОБУС", ООО "Интернет Решения" - по 10 000 руб., а также взыскать с ответчиков судебные расходы.	\N	2024-06-20 09:25:00	\N	16	17	10	Защита имущественных прав	f	\N	0
23	accepted	Клиент, модельер, обнаружил, что конкурирующий бренд одежды использует их уникальные дизайнерские модели без разрешения. Клиент просит признать факт несанкционированного использования его моделей, объявить линию одежды конкурента нарушающей права клиента на дизайн и потребовать, чтобы конкурент прекратил производство, распространение и продажу одежды, нарушающей авторские права. Клиент требует компенсации морального вреда в размере 100 000 рублей и компенсации за нарушение исключительных прав в размере 200 000 рублей. Судебные издержки также подлежат возмещению.	\N	2024-06-20 18:00:00	\N	21	31	6	Защита личных неимущественных прав	t	\N	0
19	pending	Клиент, юридическая фирма, столкнулся с проблемой нарушения авторских прав. Их учебный материал под названием "Справочник юридической фирмы: всеобъемлющее руководство" был незаконно опубликован и распространен неуполномоченной третьей стороной. Клиент требует признать факт нарушения, объявить публикацию контрафактной и потребовать, чтобы стороны, допустившие нарушение, прекратили производство, распространение и перепечатку материалов как в печатном, так и в цифровом форматах. Сумма компенсации морального вреда составляет 120 000 рублей, а с виновных сторон взыскивается компенсация за нарушение исключительных прав на общую сумму 200 000 рублей. Судебные издержки также подлежат взысканию.	\N	\N	\N	\N	27	11	Защита личных неимущественных прав	f	\N	22
21	accepted	Клиент, девелопер недвижимости, обнаружил, что конкурирующая компания использует их уникальные архитектурные проекты без разрешения. Клиент требует признать факт несанкционированного использования его проектов, объявить здания конкурента нарушающими авторские права клиента и потребовать, чтобы конкурент прекратил использование нарушающих авторские права проектов. Клиент требует компенсации морального вреда в размере 150 000 рублей и компенсации за нарушение исключительных прав в размере 300 000 рублей. Судебные издержки также подлежат возмещению.	\N	\N	\N	19	29	10	Защита личных неимущественных прав	t	\N	19
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, value, description) FROM stdin;
1	ADMIN	Администратор
2	USER	ПОЛЬЗОВАТЕЛЬ
4	OPERATOR	ОПЕРАТОР
3	LAWYER	ЮРИСТ
\.


--
-- Data for Name: type_right; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_right (id, name, description, icon, type_trouble) FROM stdin;
11	Относительные права	Права, где управомоченному лицу противостоит определённый круг обязанных лиц.	\N	["Договорные обязательства", "Права, вытекающие из конкретных юридических сделок"]
8	Вещные права	Права на вещи, которые предоставляют возможность непосредственного воздействия на вещь.	\N	["Право собственности", "Право оперативного управления имуществом предприятия", "Право колхоза бесплатно и бессрочно пользоваться землей", "Право гражданина пользоваться земельным участком для индивидуального жилищного строительства"]
10	Абсолютные права	Права, где управомоченному лицу противостоит неопределённый круг обязанных лиц.	\N	["Защита имущественных прав", "Защита личных неимущественных прав"]
7	Личные неимущественные права	Права, не связанные с материальными благами, а касающиеся личных нематериальных благ.	\N	["Право авторства на произведения науки, литературы и искусства", "Право на открытия, изобретения и рационализаторские предложения", "Право на защиту чести и достоинства", "Право организаций на фирменное наименование", "Право на производственную марку", "Право на товарный знак"]
6	Имущественные права	Права, касающиеся материальных благ и имущества.	\N	["Право собственности", "Право оперативного управления имуществом (государственных предприятий и организаций)", "Право пользования жилым помещением", "Право пользования имуществом, взятым напрокат"]
12	Исключительные права	Права, позволяющие субъекту гражданского права пользоваться зарегистрированными в установленном порядке объектами интеллектуальной собственности.	\N	["Право на использование зарегистрированного товарного знака", "Право на использование изобретения", "Право на использование промышленного образца"]
9	Обязательственные права	Права требования от обязанного лица совершения определённого действия или воздержания от такового.	\N	["Права требования выполнения обязательств", "Права требования воздержания от определённых действий"]
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, last_name, middle_name, login, password, phonenumber, photo, date_of_birth, contact_email, "organizationId", "roleId", type_law, education, work_experience) FROM stdin;
18	Арсений	Киселев	Александрович	operator	$2b$10$iFO/Y0Qm83Agn3XxQsvs4uYcSIh5L3AlMCciRUzFI8mxGJkegskR.	89127418291	photo-1718555133373-420453883.png	2002-02-02 00:00:00	mail@mail.ru	\N	4	\N	\N	\N
21	Сергей	Сергеев	Сергеевич	sergeev	$2b$10$lUOqwEH8nVjLED0HON0eyebFZs8f1cYZWYRqA2MjTy82BA.CJgDmS	89121234567	photo-1718555066675-999472349.png	1995-03-03 00:00:00	sergeev@mail.ru	\N	3	["Право собственности", "Право оперативного управления имуществом (государственных предприятий и организаций)", "Право пользования жилым помещением", "Право пользования имуществом, взятым напрокат"]	ЛГТУ	Стажер
32	ТЕСТ	ТЕСТОВ	ТЕСТОВИЧ	asd	$2b$10$Ye2JfrUWc/IWIkJrtrViX.qGbu2rIz7p2q2ikATwGzKLc1ZM.Q94W	null	photo-1718653576840-312669075.jpg	2002-06-12 00:00:00	123@gmail.com	\N	2	[]		
17	Тимур	Хоперский	Юрьевич	user	$2b$10$uqk5kSR6xlO6aBct9tXgKeP9Np6c6A.r/OOMBP0vRHMeXvfkqk5n2	89127418291	\N	2002-07-05 00:00:00	kuznetsova@mail.ru	\N	2	\N	\N	\N
31	Дмитрий	Соколов	Николаевич	sokolov	$2b$10$Q37/PAlAzZHCyJEbirMZF.z7qljQOyFUbiOXs/MGP8s5Ve5qQZu6i	89122345678	\N	1992-05-05 00:00:00	sokolov@mail.ru	\N	2	\N	\N	\N
29	Иван	Морозов	Дмитриевич	morozov	$2b$10$29KG7nL8HEu7EUpLJoJQ1O34PHpb3Bixvd8t1VcUDng3hIP5u3bGK	89121234567	\N	1995-03-03 00:00:00	morozov@mail.ru	\N	2	\N	\N	\N
28	Анна	Козлова	Владимировна	annak	$2b$10$AZ4LPfnxijscF.GoFC4QMeRGWpL8di0gHOwwFMiXMzUsK1hyxF.9W	89129876543	\N	1985-02-02 00:00:00	annak@mail.ru	\N	2	\N	\N	\N
27	Петр	Сидоров	Алексеевич	petrs	$2b$10$OQzuBem2EGRDHFxQDNcS4OqDvv/0ujQMVMuLWytni6LjB1Q.bNBkG	89123456789	\N	1990-01-01 00:00:00	petrs@mail.ru	\N	2	\N	\N	\N
20	Петр	Петров	Петрович	petrov	$2b$10$lLezIO.iN4KEYW79aWxKFeuUI9nOIiMwZPL0BSs9sXqefyQXH3Zqu	89129876543	photo-1718555042369-580432797.png	1985-02-02 00:00:00	petrov@mail.ru	\N	3	["Право собственности", "Право оперативного управления имуществом предприятия", "Право колхоза бесплатно и бессрочно пользоваться землей", "Право гражданина пользоваться земельным участком для индивидуального жилищного строительства"]	ЛГТУ	1 год 3 месяца
22	Анна	Иванова	Петровна	annai	$2b$10$a8zETPfsi6XU7YeKKxOgT.b/thPlgGnf3Swe0Xay6ztskSvnkcffy	89127894561	photo-1718555083040-353071236.png	1980-04-04 00:00:00	annai@mail.ru	\N	3	["Право на использование зарегистрированного товарного знака", "Право на использование изобретения", "Право на использование промышленного образца"]	ЛГТУ	2 года 1 месяц
33	ТЕСТ	ТЕСТОВ	ТЕСТОВИЧ	фываыф	$2b$10$TNvt8DY5b7hft.NRmjDs5.bqHAZyAbJqkrYoSghKr8GfU2mQEF6gi	\N	\N	2024-06-11 00:00:00	123@gmail.com	\N	2	[]		
19	Иван	Иванов	Иванович	ivanov	$2b$10$bcYfAKqezmoD6XkX7aaKqu0GFsRBkZSd8df1bQhWwjzz9vdeHBmvy	89123456789	photo-1718555021934-839002176.png	1990-01-01 00:00:00	ivanov@mail.ru	\N	3	["Право авторства на произведения науки, литературы и искусства", "Право на открытия, изобретения и рационализаторские предложения", "Право на защиту чести и достоинства", "Право организаций на фирменное наименование", "Право на производственную марку", "Право на товарный знак"]	ЛГТУ	Стажер
30	Ника	Киселева	Александровна	xuy1	$2b$10$ZcbMbp7SlveXiZrYBROcr.ylgUwu4ur51aqfVsjOpCvkbwO4nIu4i	null	photo-1718563422050-409362130.png	2009-06-16 00:00:00	421@gmail.com	\N	2	[]		
16	Арсений	Киселев	Александрович	test	$2b$10$uqk5kSR6xlO6aBct9tXgKeP9Np6c6A.r/OOMBP0vRHMeXvfkqk5n2	89127418291	photo-1718860163058-302666656.jpg	2024-09-05 00:00:00	mail@mail.ru	\N	3	["Права требования выполнения обязательств", "Права требования воздержания от определённых действий"]	ЛГТУ	2 года 1 месяц
\.


--
-- Name: case_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.case_id_seq', 40, true);


--
-- Name: discount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discount_id_seq', 1, false);


--
-- Name: feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedback_id_seq', 1, false);


--
-- Name: organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organization_id_seq', 8, true);


--
-- Name: portfolio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.portfolio_id_seq', 1, false);


--
-- Name: request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.request_id_seq', 15, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: type_right_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_right_id_seq', 12, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 33, true);


--
-- Name: request PK_167d324701e6867f189aed52e18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY (id);


--
-- Name: type_right PK_21590adc83ab97fe106b743325b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_right
    ADD CONSTRAINT "PK_21590adc83ab97fe106b743325b" PRIMARY KEY (id);


--
-- Name: organization PK_472c1f99a32def1b0abb219cd67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY (id);


--
-- Name: portfolio PK_6936bb92ca4b7cda0ff28794e48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY (id);


--
-- Name: feedback PK_8389f9e087a57689cd5be8b2b13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY (id);


--
-- Name: case PK_a1b20a2aef6fc438389d2c4aca0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."case"
    ADD CONSTRAINT "PK_a1b20a2aef6fc438389d2c4aca0" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: discount PK_d05d8712e429673e459e7f1cddb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount
    ADD CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY (id);


--
-- Name: request FK_38554ade327a061ba620eee948b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "FK_38554ade327a061ba620eee948b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: feedback FK_4a39e6ac0cecdf18307a365cf3c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: case FK_82d729c0bc510cc12a51b48bd6e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."case"
    ADD CONSTRAINT "FK_82d729c0bc510cc12a51b48bd6e" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: request FK_870e155480d512f709003329895; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "FK_870e155480d512f709003329895" FOREIGN KEY ("typeRightId") REFERENCES public.type_right(id);


--
-- Name: portfolio FK_9d041c43c782a9135df1388ae16; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT "FK_9d041c43c782a9135df1388ae16" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.roles(id);


--
-- Name: discount FK_cf500130a0d2ac5af6109068e63; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount
    ADD CONSTRAINT "FK_cf500130a0d2ac5af6109068e63" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user FK_dfda472c0af7812401e592b6a61; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES public.organization(id);


--
-- PostgreSQL database dump complete
--

