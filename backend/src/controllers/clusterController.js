const Cluster = require('../models/Cluster');

/**
 * @desc    Get all clusters
 * @route   GET /api/clusters
 * @access  Private
 */
exports.getClusters = async (req, res, next) => {
  try {
    const clusters = await Cluster.find();

    const formattedClusters = clusters.map(cluster => ({
      id: cluster.id,
      name: cluster.name,
      location: cluster.location,
      coordinates: cluster.coordinates,
      passengers: cluster.passengers,
      shuttlesAssigned: cluster.shuttlesAssigned,
      status: cluster.status,
      color: cluster.color,
      demand: cluster.demand,
      lastUpdate: cluster.lastUpdate
    }));

    res.status(200).json({
      success: true,
      clusters: formattedClusters
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single cluster
 * @route   GET /api/clusters/:id
 * @access  Private
 */
exports.getCluster = async (req, res, next) => {
  try {
    const cluster = await Cluster.findOne({ id: req.params.id });

    if (!cluster) {
      return res.status(404).json({ message: 'Cluster not found' });
    }

    res.status(200).json({
      success: true,
      cluster: {
        id: cluster.id,
        name: cluster.name,
        location: cluster.location,
        coordinates: cluster.coordinates,
        passengers: cluster.passengers,
        shuttlesAssigned: cluster.shuttlesAssigned,
        status: cluster.status,
        color: cluster.color,
        demand: cluster.demand,
        lastUpdate: cluster.lastUpdate
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update cluster (real-time data)
 * @route   PUT /api/clusters/:id
 * @access  Private (Admin/Operator)
 */
exports.updateCluster = async (req, res, next) => {
  try {
    const { passengers, shuttlesAssigned, demand, status } = req.body;

    const cluster = await Cluster.findOneAndUpdate(
      { id: req.params.id },
      { 
        passengers, 
        shuttlesAssigned, 
        demand, 
        status,
        lastUpdate: 'Just now'
      },
      { new: true }
    );

    if (!cluster) {
      return res.status(404).json({ message: 'Cluster not found' });
    }

    res.status(200).json({
      success: true,
      cluster: {
        id: cluster.id,
        passengers: cluster.passengers,
        shuttlesAssigned: cluster.shuttlesAssigned,
        demand: cluster.demand,
        status: cluster.status,
        lastUpdate: cluster.lastUpdate
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create cluster
 * @route   POST /api/clusters
 * @access  Private (Admin)
 */
exports.createCluster = async (req, res, next) => {
  try {
    const clusterId = `CL-${Date.now().toString().slice(-3)}`;
    
    const cluster = await Cluster.create({
      id: clusterId,
      ...req.body
    });

    res.status(201).json({
      success: true,
      cluster
    });
  } catch (error) {
    next(error);
  }
};
