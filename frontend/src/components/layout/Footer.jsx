import React from 'react'
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Stack } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 10, borderTop: '6px solid #f97316' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" fontWeight="900" sx={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', mb: 2 }}>
              Bolt
            </Typography>
            <Typography variant="body1" color="grey.400" paragraph>
              Everyday essentials on fire. Clothing • Electronics • Daily Gear
            </Typography>
            <Stack direction="row" spacing={2} sx={{ my: 3 }}>
              <IconButton sx={{ color: '#fb923c', '&:hover': { color: '#fbbf24' } }}><InstagramIcon /></IconButton>
              <IconButton sx={{ color: '#fb923c', '&:hover': { color: '#fbbf24' } }}><TwitterIcon /></IconButton>
              <IconButton sx={{ color: '#fb923c', '&:hover': { color: '#fbbf24' } }}><FacebookIcon /></IconButton>
            </Stack>
            <Typography variant="body2" color="grey.500">
              +91 98753-04467 • hello@bolt.store
            </Typography>
          </Grid>

          {[
            { title: "Shop", links: ["Clothing", "Electronics", "Daily Essentials", "New Arrivals", "Sale"] },
            { title: "Company", links: ["About", "Careers", "Press", "Blog", "Contact"] },
            { title: "Support", links: ["Help", "Shipping", "Returns", "Size Guide", "Track Order"] }
          ].map(col => (
            <Grid item xs={6} md={2} key={col.title}>
              <Typography variant="h6" color="#fb923c" fontWeight="bold" gutterBottom>{col.title}</Typography>
              <Stack spacing={1.5}>
                {col.links.map(link => (
                  <Link key={link} href="#" color="grey.400" underline="hover" sx={{ '&:hover': { color: '#fbbf24' } }}>
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ bgcolor: '#f97316', my: 6, height: 2 }} />
        <Typography variant="body2" color="grey.600" align="center">
          © 2025 Bolt Store. Made with 🔥 in India.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer