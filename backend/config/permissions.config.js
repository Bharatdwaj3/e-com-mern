const PERMISSIONS = {
    admin: [
        // User management
        'manage_users',
        'view_users',
        'delete_user',
        'view_sellers',
        // Product management
        'create_product',
        'view_products',
        'update_product',
        'delete_product',
        'delete_seller',

        // Order management
        'view_orders',
        'update_order_status',
        'delete_order',
        'update_seller',

        // Payment management
        'view_payments',

        //Customer Management
        'view_customers',
        'view_customer',
        'delete_customer',

        // Self
        'view_self',
        'update_self',
        'view-self'
    ],

    seller: [
        // Product management (only their own)
        'create_product',
        'view_products',
        'update_product',
        'delete_product',

        // Orders related to their products
        'view_orders',
        'update_order_status',
        'update_seller',
        // Self
        'view-self',
        
        'update_self',
        //Customer Management
        'view_sellers',
        'create_product',
        'delete_product',
        'view_customers'
    ],

    customer: [
        // Browsing & purchasing
        'view_products',
        'create_order',
        'view_orders',
        'make_payment',
        'view_payments',

        

        // Self
        'view_self',
        'update_self',
        'view_customer'
    ]
};

module.exports = PERMISSIONS;
