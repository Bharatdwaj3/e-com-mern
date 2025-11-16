import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, InputLabel, Snackbar, Alert,
} from "@mui/material";
import { Add, Edit, Delete, CloudUpload } from "@mui/icons-material";

const API = "http://localhost:5001/api/product";   

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", severity: "success" });

  const blankForm = {
    type: "", brand: "", usage: "", price: "", size: "", color: "", material: "",
    power: "", port: "", wired: "", display: "", storage: ""
  };
  const [form, setForm] = useState(blankForm);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(API, { withCredentials: true });
        setProducts(data.map(({ _id, ...p }) => ({ ...p, _id })));
      } catch (e) {
        console.error(e);
        setToast({ open: true, msg: "Failed to load products", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async () => {
    if (!form.type || !form.brand || !form.usage) {
      setToast({ open: true, msg: "Type, Brand and Usage are required", severity: "warning" });
      return;
    }

    setSaving(true);
    try {
      const payload = new FormData();

      const textFields = ["type", "brand", "usage", "price", "size", "color", "material", "port", "storage"];
      textFields.forEach(k => {
        if (form[k] !== "" && form[k] != null) payload.append(k, form[k]);
      });

      ["power", "wired", "display"].forEach(f => {
        const val = form[f];
        if (val === "" || val == null) {
          return null;
        } else if (val === "true") {
          payload.append(f, "true");
        } else if (val === "false") {
          payload.append(f, "false");
        } else {
          payload.append(f, "false");
        }
      });

      if (file) payload.append("image", file);

      const config = {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      };

      if (editing) {
        await axios.put(`${API}/${editing._id}`, payload, config);
      } else {
        await axios.post(API, payload, config);
      }

      const { data } = await axios.get(API, { withCredentials: true });
      setProducts(data.map(({ _id, ...p }) => ({ ...p, _id })));

      setToast({ open: true, msg: editing ? "Product updated" : "Product created", severity: "success" });
      closeDialog();
    } catch (e) {
      console.error(e);
      const msg = e.response?.data?.message || e.message || "Server error";
      setToast({ open: true, msg, severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/${id}`, { withCredentials: true });
      setProducts(p => p.filter(x => x._id !== id));
      setToast({ open: true, msg: "Product deleted", severity: "success" });
    } catch (e) {
      console.error(e);
      setToast({ open: true, msg: "Delete failed", severity: "error" });
    }
  };

  const openDialog = (product = null) => {
    setEditing(product);
    setForm(product ? { ...product } : blankForm);
    setFile(null);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setEditing(null);
    setForm(blankForm);
    setFile(null);
  };

  if (loading) return <Box className="flex justify-center py-16"><CircularProgress /></Box>;

  return (
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5">Your Products</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => openDialog()}>
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Usage</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p, i) => (
              <TableRow key={i}>
                <TableCell>{p.type}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.usage}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
                  ) : "-"}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openDialog(p)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(p._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edit" : "Add"} Product</DialogTitle>
        <DialogContent dividers>
          {["type", "brand", "usage"].map(f => (
            <TextField
              key={f}
              label={f.charAt(0).toUpperCase() + f.slice(1)}
              fullWidth
              margin="normal"
              value={form[f]}
              onChange={e => setForm({ ...form, [f]: e.target.value })}
            />
          ))}

          <TextField label="Price" type="number" fullWidth margin="normal"
            value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />

          {["size", "color", "material", "port"].map(f => (
            <TextField
              key={f}
              label={f.charAt(0).toUpperCase() + f.slice(1)}
              fullWidth
              margin="normal"
              value={form[f]}
              onChange={e => setForm({ ...form, [f]: e.target.value })}
            />
          ))}

          {["power", "wired", "display"].map(f => (
            <TextField
              key={f}
              label={`${f.charAt(0).toUpperCase() + f.slice(1)} (true/false)`}
              fullWidth
              margin="normal"
              placeholder="leave empty → not applicable"
              value={form[f]}
              onChange={e => setForm({ ...form, [f]: e.target.value })}
            />
          ))}

          <TextField label="Storage (GB)" type="number" fullWidth margin="normal"
            value={form.storage} onChange={e => setForm({ ...form, storage: e.target.value })} />

          <Box mt={2}>
            <InputLabel>Product Image</InputLabel>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              fullWidth
              sx={{ mt: 1, textTransform: "none" }}
            >
              {file ? file.name : "Choose File"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={e => setFile(e.target.files?.[0] ?? null)}
              />
            </Button>
            {file && (
              <Typography variant="caption" display="block" color="textSecondary">
                {(file.size / 1024).toFixed(1)} KB
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsTab;