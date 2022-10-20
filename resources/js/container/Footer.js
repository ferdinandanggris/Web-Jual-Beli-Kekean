import { Box, Container, Icon, Link, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React from "react";

function Footer() {
    return (
        <Container sx={{ mt: 10, pr: 20, pl: 10, py: 5, bgcolor: "black" }}>
            <Stack direction={"row"} spacing={25}>
                <Stack direction={"column"} spacing={3}>
                    <Box
                        sx={{
                            width: "128px",
                        }}
                        component="img"
                        src={`../images/logoKekean.jpg`}
                    />
                    <Typography color="#C7C7C7" fontSize={12}>
                        Kekean Wastra Gallery is a business that carries local
                        Indonesian cultural values. This business was
                        established in Bali on December 2, 2014. Kekean Wastra
                        Gallery focuses on sustainable fashion with Batik,
                        Weaving, and Embroidery. With a sustainable spirit,
                        Kekean also empowers young people from vocational
                        schools and women in remote areas who need jobs.{" "}
                        <Link underline="none" href="/about">
                        <Typography
                            color="primary"
                            fontSize={12}
                            component={"span"}
                        >
                            Read more...
                        </Typography>
                        </Link>
                    </Typography>
                </Stack>
                <Stack spacing={1} direction={"column"} width={"100%"}>
                    <Typography
                        sx={{ pb: 2 }}
                        color={"white"}
                        fontSize={12}
                        fontWeight={"600"}
                    >
                        Layanan
                    </Typography>
                    <Link underline="none" href={"#"}>
                        <Typography color="#C7C7C7" fontSize={12}>
                            Cara Pengembalian
                        </Typography>
                    </Link>

                    <Link underline="none" href={"#"}>
                        <Typography color="#C7C7C7" fontSize={12}>
                            Bantuan
                        </Typography>
                    </Link>

                    <Link underline="none" href={"#"}>
                        <Typography color="#C7C7C7" fontSize={12}>
                            Konfirmasi Transfer
                        </Typography>
                    </Link>
                </Stack>
                <Stack direction={"column"} spacing={1}>
                    <Typography
                        sx={{ pb: 2 }}
                        color={"white"}
                        fontSize={12}
                        fontWeight={"600"}
                    >
                        Hubungi Kami
                    </Typography>
                    <Link
                        underline="none"
                        href={"https://www.instagram.com/kekean.galeri/?hl=en"}
                    >
                        <Stack
                            direction={"row"}
                            alignItems="center"
                            spacing={1}
                        >
                            <InstagramIcon
                                sx={{ fontSize: 32, color: "white" }}
                            />
                            <Typography color="#C7C7C7" fontSize={12}>
                                @kekean.galeri
                            </Typography>
                        </Stack>
                    </Link>
                    <Link
                        underline="none"
                        href={
                            "https://api.whatsapp.com/send?phone=628123248989"
                        }
                    >
                        <Stack
                            direction={"row"}
                            alignItems="center"
                            spacing={1}
                        >
                            <WhatsAppIcon
                                sx={{ fontSize: 32, color: "white" }}
                            />
                            <Typography color="#C7C7C7" fontSize={12}>
                                +62 8129 7000 456
                            </Typography>
                        </Stack>
                    </Link>
                    <Stack direction={"row"} alignItems="center" spacing={1}>
                        <MailOutlineIcon
                            sx={{ fontSize: 32, color: "white" }}
                        />
                        <Typography color="#C7C7C7" fontSize={12}>
                            kekeangaleriwastra@gmail.com
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
}

export default Footer;
